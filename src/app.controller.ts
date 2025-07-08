import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      routes: [
        'GET /',
        'GET /health',
        'GET /api',
        'POST /auth/register',
        'POST /auth/login', 
        'GET /user/me',
        'GET /user/admin'
      ]
    };
  }

  @Get('test')
  getTest() {
    return { message: 'Test endpoint working!' };
  }
}
