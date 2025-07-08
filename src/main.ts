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

    // Add request logging middleware
    app.use((req, res, next) => {
      const timestamp = new Date().toISOString();
      console.log(`🌐 [${timestamp}] ${req.method} ${req.url} - IP: ${req.ip || req.connection.remoteAddress}`);
      
      res.on('finish', () => {
        console.log(`📤 [${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode}`);
      });
      
      next();
    });

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
  
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application running on http://0.0.0.0:${port}`);
  console.log('📍 Available routes: /, /auth/register, /auth/login, /user/me, /user/admin');
  console.log('🌍 Environment:', process.env.RAILWAY_ENVIRONMENT || 'local');
  
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
