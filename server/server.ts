import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';
import apiRoutes from './routes/api';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Mount API Routes
app.use('/api', apiRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'GIFLRI MERN Stack API Server',
    status: 'Running',
    version: '1.0.0',
    endpoints: '/api/content, /api/institutions, /api/certificates, /api/research, /api/health',
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
