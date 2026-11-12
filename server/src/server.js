import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { logger } from './utils/logger.js';

let server;

async function bootstrap() {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Start HTTP Listener
    server = app.listen(env.port, () => {
      logger.info(`=======================================================`);
      logger.info(`  Gita Exam Platform API Server is Running!`);
      logger.info(`  Port:             ${env.port}`);
      logger.info(`  Environment:      ${env.nodeEnv}`);
      logger.info(`  API Base URL:     http://localhost:${env.port}/api/v1`);
      logger.info(`  Swagger Docs:     http://localhost:${env.port}/api/docs`);
      logger.info(`=======================================================`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      if (server) {
        server.close(async () => {
          logger.info('HTTP server closed.');
          await disconnectDB();
          process.exit(0);
        });
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

bootstrap();
