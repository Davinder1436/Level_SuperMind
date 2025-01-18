import { connectDB } from './lib/astradb';
import app from './app';
import { config } from './config';

async function startServer() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

startServer();