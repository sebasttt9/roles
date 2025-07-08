import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting application...');
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Add request logging
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`🌐 [${timestamp}] ${req.method} ${req.url}`);
    
    res.on('finish', () => {
      console.log(`📤 [${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    });
    
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Roles y Permisos API')
    .setDescription('API de autenticación y autorización con NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on port ${port}`);
  console.log(`📖 Swagger available at: http://0.0.0.0:${port}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log available routes
  console.log('📍 Available routes:');
  console.log('  GET  /');
  console.log('  GET  /health');
  console.log('  GET  /test');
  console.log('  GET  /version');
  console.log('  GET  /auth/test');
  console.log('  POST /auth/register');
  console.log('  POST /auth/login');
  console.log('  GET  /user/test');
  console.log('  GET  /user/me');
  console.log('  GET  /user/admin');
  console.log('  📚 BOOKS MODULE:');
  console.log('  GET    /books');
  console.log('  GET    /books/test');
  console.log('  GET    /books/stats');
  console.log('  GET    /books/search?q=query');
  console.log('  GET    /books/genre/:genre');
  console.log('  GET    /books/author/:author');
  console.log('  GET    /books/:id');
  console.log('  POST   /books');
  console.log('  PUT    /books/:id');
  console.log('  DELETE /books/:id');
  
  // Keep the process alive and handle signals properly
  process.on('SIGTERM', () => {
    console.log('📡 SIGTERM received, shutting down gracefully...');
    app.close().then(() => {
      console.log('✅ Application closed');
      process.exit(0);
    });
  });
  
  process.on('SIGINT', () => {
    console.log('📡 SIGINT received, shutting down gracefully...');
    app.close().then(() => {
      console.log('✅ Application closed');
      process.exit(0);
    });
  });
  
  console.log('🎯 Application bootstrap completed successfully');
}

bootstrap().catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
