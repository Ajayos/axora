import { createServer, type IncomingMessage } from 'node:http';

export type Handler = (request: IncomingMessage) => unknown | Promise<unknown>;

export function createApp() {
  const routes = new Map<string, Handler>();
  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
      const handler = routes.get((request.method ?? 'GET') + ' ' + pathname);
      if (!handler) {
        response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'Not found' }));
        return;
      }
      const data = await handler(request);
      const body = JSON.stringify(data ?? null);
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(body);
    } catch {
      response.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
  return {
    server,
    get(path: string, handler: Handler) {
      const key = 'GET ' + path;
      if (routes.has(key)) throw new Error('Duplicate route: ' + key);
      routes.set(key, handler);
      return this;
    },
    listen(port: number, host = '127.0.0.1') {
      return server.listen(port, host);
    }
  };
}
