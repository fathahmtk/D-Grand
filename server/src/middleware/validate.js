/**
 * validate — request schema validation middleware factory
 *
 * Validates req.body against a plain-object schema descriptor.
 * Returns a 400 with a field-level error map on the first failing rule.
 *
 * Keeps controllers completely free of validation logic.
 *
 * Schema format:
 * {
 *   fieldName: {
 *     required?: boolean,
 *     type?: 'string' | 'number' | 'array' | 'boolean',
 *     minLength?: number,
 *     maxLength?: number,
 *     min?: number,
 *     max?: number,
 *     pattern?: RegExp,
 *     custom?: (value, body) => string | null   // return error msg or null
 *   }
 * }
 *
 * Usage:
 *   router.post('/', validate(createOrderSchema), asyncHandler(createOrder));
 */

export const validate = (schema) => (req, res, next) => {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
        const value = req.body[field];
        const isEmpty = value === undefined || value === null || value === '';

        if (rules.required && isEmpty) {
            errors[field] = `${field} is required`;
            continue;
        }

        if (isEmpty) continue; // optional field not provided — skip remaining rules

        if (rules.type) {
            const actualType = Array.isArray(value) ? 'array' : typeof value;
            if (actualType !== rules.type) {
                errors[field] = `${field} must be a ${rules.type}`;
                continue;
            }
        }

        if (rules.type === 'string') {
            if (rules.minLength !== undefined && value.length < rules.minLength) {
                errors[field] = `${field} must be at least ${rules.minLength} characters`;
                continue;
            }
            if (rules.maxLength !== undefined && value.length > rules.maxLength) {
                errors[field] = `${field} must be at most ${rules.maxLength} characters`;
                continue;
            }
            if (rules.pattern && !rules.pattern.test(value)) {
                errors[field] = rules.patternMessage || `${field} format is invalid`;
                continue;
            }
        }

        if (rules.type === 'number') {
            if (rules.min !== undefined && value < rules.min) {
                errors[field] = `${field} must be at least ${rules.min}`;
                continue;
            }
            if (rules.max !== undefined && value > rules.max) {
                errors[field] = `${field} must be at most ${rules.max}`;
                continue;
            }
        }

        if (rules.custom) {
            const customError = rules.custom(value, req.body);
            if (customError) {
                errors[field] = customError;
                continue;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};
