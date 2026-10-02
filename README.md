# Axora

Initial TypeScript + ESM scaffold using native Node.js HTTP. Requires Node.js 22+.

Implemented: exact GET routes, JSON responses, safe handler errors, and an HTTP smoke test.
Planned: unified typed Actions, HTTP input validation, GraphQL, MCP, streaming SSR,
runtime modes (all/http/graphql/mcp/ssr), graceful shutdown and deployment hardening.
These planned features are not implemented in this starter.

## Development

From the private devcore root:

```bash
pnpm install
pnpm run check:axora
pnpm run test:axora
pnpm run prepare:axora
```

From this standalone repository: `pnpm install`, `pnpm run build`, `pnpm run test`.
Run `node examples/server.mjs` after building.

