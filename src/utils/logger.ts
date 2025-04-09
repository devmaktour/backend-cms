import { Context } from 'koa';

const getRequestId = (ctx: Context): string | undefined => {
    return ctx?.state?.requestId as string | undefined;
};

const info = (ctx: Context, message: string, ...args: any[]) => {
    const requestId = getRequestId(ctx);
    const logMessage = requestId ? `[${requestId}] ${message}` : message;
    strapi.log.info(logMessage, ...args);
};

const debug = (ctx: Context, message: string, ...args: any[]) => {
    const requestId = getRequestId(ctx);
    const logMessage = requestId ? `[${requestId}] ${message}` : message;
    strapi.log.debug(logMessage, ...args);
};

const warn = (ctx: Context, message: string, ...args: any[]) => {
    const requestId = getRequestId(ctx);
    const logMessage = requestId ? `[${requestId}] ${message}` : message;
    strapi.log.warn(logMessage, ...args);
};

const error = (ctx: Context, message: string, ...args: any[]) => {
    const requestId = getRequestId(ctx);
    const logMessage = requestId ? `[${requestId}] ${message}` : message;
    strapi.log.error(logMessage, ...args);
};

interface Logger {
    info: (ctx: Context, message: string, ...args: any[]) => void;
    debug: (ctx: Context, message: string, ...args: any[]) => void;
    warn: (ctx: Context, message: string, ...args: any[]) => void;
    error: (ctx: Context, message: string, ...args: any[]) => void;
}

export const LOG: Logger = {
    info: info,
    debug: debug,
    warn: warn,
    error: error,
}
