import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    await app.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
