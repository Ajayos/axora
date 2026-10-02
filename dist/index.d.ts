import { type IncomingMessage } from 'node:http';
export type Handler = (request: IncomingMessage) => unknown | Promise<unknown>;
export declare function createApp(): {
    server: import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
    get(path: string, handler: Handler): {
        server: import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
        get(path: string, handler: Handler): /*elided*/ any;
        listen(port: number, host?: string): import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
    };
    listen(port: number, host?: string): import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
};
