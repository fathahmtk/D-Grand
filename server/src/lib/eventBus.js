/**
 * EventBus — lightweight domain event emitter
 *
 * Decouples side effects (notifications, audit logs, analytics) from core
 * business logic. Services emit events; listeners handle consequences without
 * the service knowing or caring about them.
 *
 * This is synchronous (Node's built-in EventEmitter). For async/durable events
 * later, swap this for a Redis pub/sub or BullMQ queue with zero changes to
 * service code.
 *
 * Usage (emit):
 *   import { eventBus } from '../lib/eventBus.js';
 *   eventBus.emit('order.placed', { order });
 *
 * Usage (subscribe — in a listener file wired up in server.js):
 *   import { eventBus } from '../lib/eventBus.js';
 *   eventBus.on('order.placed', ({ order }) => { ... });
 */

import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
    /**
     * Emit a domain event. Wraps the standard emit to:
     * - Accept a single payload object (better DX than positional args)
     * - Log unhandled errors from async listeners to avoid silent failures
     */
    emit(event, payload) {
        return super.emit(event, payload);
    }
}

export const eventBus = new EventBus();

// Prevent uncaught listener errors from crashing the process
eventBus.on('error', (err) => {
    // Imported lazily to avoid circular dependency with logger
    import('../utils/logger.js').then(({ default: logger }) => {
        logger.error(`[EventBus] Unhandled error: ${err.message}`, { stack: err.stack });
    });
});
