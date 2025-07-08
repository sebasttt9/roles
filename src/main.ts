import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting application...');
  
  const app = await NestFactory.create(AppModule);

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
  console.log(`🚀 Application running on port ${port}`);
  console.log(`📖 Swagger available at: http://0.0.0.0:${port}/api`);
  
  // Keep the process alive
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, but keeping app alive');
  });
}

bootstrap().catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
