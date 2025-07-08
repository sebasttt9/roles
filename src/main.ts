import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('Starting application bootstrap...');
  
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for Railway deployment
    app.enableCors({
      origin: true,
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    console.log('Setting up Swagger documentation...');

  const config = new DocumentBuilder()
    .setTitle('Roles y Permisos API')
    .setDescription('Autenticación y autorización con NestJS, JWT y Roles')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  const host = '0.0.0.0'; // Always bind to all interfaces for Railway
  const env = process.env.RAILWAY_ENVIRONMENT || process.env.NODE_ENV || 'development';
  
  await app.listen(port, host);
  console.log(`Application is running on: http://${host}:${port}`);
  console.log('Available routes: /, /auth/register, /auth/login, /user/me, /user/admin');
  console.log('Environment:', env);
  console.log('Railway Environment:', process.env.RAILWAY_ENVIRONMENT || 'not set');

  // Graceful shutdown handling
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await app.close();
    process.exit(0);
  });
  
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
