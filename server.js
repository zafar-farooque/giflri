// Production entry point for the backend.
//
// Hostinger's Passenger/LiteSpeed runtime loads this file with require(), so it
// MUST be synchronous and must NOT use top-level await (require() cannot load an
// ESM graph that contains top-level await -> ERR_REQUIRE_ASYNC_MODULE).
//
// We enable tsx's CommonJS hook so Node can require the TypeScript server
// (server/server.ts) and all of its imports on the fly, then load it.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Register tsx so require() understands TypeScript / ESM-syntax .ts files.
require('tsx/cjs');

// Load and start the Express server (server/server.ts calls app.listen()).
require('./server/server.ts');
