import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import apiRoutes from './routes/api';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Mount API Routes
app.use('/api', apiRoutes);

// Serve the built frontend (production) from the SAME origin as the API,
// so the client's relative "/api/..." calls resolve correctly without a proxy.
const clientDist = path.resolve(process.cwd(), 'dist');
app.use(express.static(clientDist));

// SPA fallback: any non-API GET returns index.html so client-side routing
// (React Router) works on page refresh and deep links. Falls through in dev
// (no dist build) so the dev API server keeps working on its own.
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server & Connect Database
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 [MERN Backend] Express Server running on: http://localhost:${PORT}`);
    console.log(`📡 [API Health Check]: http://localhost:${PORT}/api/health\n`);
  });
}

startServer();

export default app;
