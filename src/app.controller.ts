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
        'GET /test',
        'GET /simple-auth',
        'GET /simple-user',
        'GET /debug',
        'GET /api',
        'POST /auth/register (may fail)',
        'POST /auth/login (may fail)', 
        'GET /user/me (may fail)',
        'GET /user/admin (may fail)'
      ]
    };
  }

  @Get('test')
  getTest() {
    console.log('🧪 Test endpoint called!');
    return { message: 'Test endpoint working!' };
  }

  @Get('simple-auth')
  getSimpleAuth() {
    console.log('🔐 Simple auth endpoint called!');
    return {
      controller: 'auth',
      message: 'Simple auth endpoint working - no guards',
      timestamp: new Date().toISOString(),
      note: 'This endpoint does not require authentication'
    };
  }

  @Get('simple-user')
  getSimpleUser() {
    console.log('👤 Simple user endpoint called!');
    return {
      controller: 'user',
      message: 'Simple user endpoint working - no guards', 
      timestamp: new Date().toISOString(),
      note: 'This endpoint does not require authentication'
    };
  }

  @Get('debug')
  getDebug() {
    console.log('🐛 Debug endpoint called!');
    return {
      message: 'Debug information',
      environment: process.env.NODE_ENV || 'development',
      railway: process.env.RAILWAY_ENVIRONMENT || 'not-railway',
      timestamp: new Date().toISOString(),
      database: process.env.DATABASE_URL ? 'connected' : 'not-configured'
    };
  }
}
