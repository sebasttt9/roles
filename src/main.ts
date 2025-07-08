import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting application bootstrap...');
  
  try {
    console.log('📦 Creating NestJS application...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    console.log('✅ NestJS application created successfully');

    // Enable CORS for Railway deployment
    app.enableCors({
      origin: true,
      credentials: true,
    });

    console.log('🌐 CORS enabled');

    app.useGlobalPipes(new ValidationPipe());

    console.log('🔧 Global pipes configured');

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

  console.log('📖 Swagger documentation configured');

  const port = process.env.PORT || 3000;
  
  await app.listen(port, '0.0.0.0');
  
  // Get all registered routes
  const server = app.getHttpServer();
  const router = server._events.request.router;
  
  console.log('🚀 Application running on http://0.0.0.0:' + port);
  console.log('📍 Registered routes:');
  
  // Try to log available routes
  try {
    const routes = app.get('RoutesResolver');
    console.log('📋 Routes found:', routes);
  } catch (e) {
    console.log('❌ Could not get routes:', e.message);
  }
  
  console.log('🌍 Environment:', process.env.RAILWAY_ENVIRONMENT || 'local');
  
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
