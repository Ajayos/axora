import { createApp } from '../dist/index.js';
const app = createApp();
app.get('/health', () => ({ ok: true }));
app.listen(3000);
console.log('Axora listening at http://127.0.0.1:3000');
