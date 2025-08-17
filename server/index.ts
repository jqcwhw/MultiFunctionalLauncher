
import express from 'express';
import cors from 'cors';
import path from 'path';
import { registerRoutes } from './routes';
import { processManager } from './process-manager';
import { ps99GameIntegration } from './ps99-game-integration';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register API routes
registerRoutes(app);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  });
}

// Initialize PS99 game integration
ps99GameIntegration.on('apiDataLoaded', (data) => {
  console.log(`PS99 API loaded: ${data.eggs} eggs, ${data.pets} pets`);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log('🎮 Pet Simulator 99 integration ready');
  
  // Auto-start process monitoring
  processManager.startMonitoring();
});

export default app;
