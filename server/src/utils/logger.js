import { createLogger, format, transports } from 'winston';
import { env } from '../config/env.js';

const { combine, timestamp, errors, json, colorize, printf } = format;

// Human-readable format for local development
const devFormat = combine(
    colorize({ all: true }),
    timestamp({ format: 'HH:mm:ss' }),
    errors({ stack: true }),
    printf(({ level, message, timestamp, stack }) =>
        stack ? `${timestamp} ${level}: ${message}\n${stack}` : `${timestamp} ${level}: ${message}`
    )
);

// Structured JSON format for production log aggregators
const prodFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
);

const logger = createLogger({
    level: env.isProd ? 'info' : 'debug',
    format: env.isProd ? prodFormat : devFormat,
    transports: env.isProd
        ? [
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined.log' }),
            // Also show in Render/Railway console
            new transports.Console(),
        ]
        : [new transports.Console()],
});

export default logger;
