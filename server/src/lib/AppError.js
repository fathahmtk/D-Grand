/**
 * AppError — typed application error
 *
 * Throw this from any service or repository to signal a known failure
 * (not found, validation, conflict, etc.). The global error handler in
 * server.js checks `isOperational` to decide whether to expose the
 * message to the client or replace it with a generic 500 response.
 *
 * Usage:
 *   throw new AppError('Product not found', 404);
 *   throw new AppError('Coupon expired', 400, { code: 'COUPON_EXPIRED' });
 */
export class AppError extends Error {
    /**
     * @param {string}  message     Human-readable error message (sent to client)
     * @param {number}  statusCode  HTTP status code
     * @param {object}  [meta]      Optional extra data attached to the response
     */
    constructor(message, statusCode = 500, meta = {}) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.meta = meta;
        /** true = known, expected failure — safe to show message to client */
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    // ── Semantic factory helpers ───────────────────────────────────────────────

    static notFound(resource = 'Resource') {
        return new AppError(`${resource} not found`, 404);
    }

    static badRequest(message, meta) {
        return new AppError(message, 400, meta);
    }

    static conflict(message, meta) {
        return new AppError(message, 409, meta);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403);
    }

    static serviceUnavailable(message = 'External service unavailable') {
        return new AppError(message, 502);
    }
}
