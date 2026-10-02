import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../dist/index.js';

test('HTTP JSON response, 404, and safe handler error', async (t) => {
  const app = createApp();
  app.get('/health', () => ({ ok: true }));
  app.get('/error', () => { throw new Error('private error details'); });
  app.listen(0);
  await once(app.server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    app.server.closeAllConnections();
    app.server.close(error => error ? reject(error) : resolve());
  }));
  const base = 'http://127.0.0.1:' + app.server.address().port;
  const health = await fetch(base + '/health?check=1');
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { ok: true });
  assert.equal((await fetch(base + '/missing')).status, 404);
  const error = await fetch(base + '/error');
  assert.equal(error.status, 500);
  assert.deepEqual(await error.json(), { error: 'Internal server error' });
});
