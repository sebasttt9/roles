import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Railway deployment
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix for API routes
  app.setGlobalPrefix('api', {
    exclude: ['/'], // Exclude root path to keep "Hello World!"
  });

  const config = new DocumentBuilder()
    .setTitle('Roles y Permisos API')
    .setDescription('Autenticación y autorización con NestJS, JWT y Roles')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
