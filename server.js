// Production entry point for the backend.
//
// Hostinger (and `npm start`) run `node server.js`. Node cannot execute the
// TypeScript server (server/server.ts) directly, so we register tsx — the same
// loader used in development — which transparently compiles the TypeScript
// server and all of its imports (including tsconfig path aliases) on the fly.
import { register } from 'tsx/esm/api';

register();

await import('./server/server.ts');
