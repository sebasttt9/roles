import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('🏠 Health Check endpoint called!');
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    console.log('💚 Health endpoint called!');
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
    console.log('🧪 Test endpoint called!');
    return { message: 'Test endpoint working!' };
  }
}
