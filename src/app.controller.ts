import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

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

  @Get('routes')
  getRoutes() {
    console.log('🗺️ Routes endpoint called!');
    return {
      message: 'Available routes in this controller',
      routes: [
        'GET /',
        'GET /health', 
        'GET /test',
        'GET /simple-auth',
        'GET /simple-user', 
        'GET /debug',
        'GET /routes'
      ],
      otherControllers: [
        'GET /auth/test',
        'POST /auth/register',
        'POST /auth/login',
        'GET /user/test',
        'GET /user/me (requires auth)',
        'GET /user/admin (requires auth)'
      ],
      note: 'If other routes give 404, there may be a module loading issue'
    };
  }

  @Get('full-debug')
  fullDebug(@Req() req: Request, @Res() res: Response) {
    console.log('=== FULL DEBUG ENDPOINT CALLED ===');
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    console.log('Request headers:', req.headers);
    console.log('Request params:', req.params);
    console.log('Request query:', req.query);
    
    const debugInfo = {
      message: 'Full debug endpoint working',
      timestamp: new Date().toISOString(),
      request: {
        url: req.url,
        method: req.method,
        headers: req.headers,
        params: req.params,
        query: req.query,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        protocol: req.protocol,
        hostname: req.hostname,
        ip: req.ip,
        path: req.path
      },
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
        JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET'
      }
    };
    
    console.log('Debug info:', JSON.stringify(debugInfo, null, 2));
    
    return res.json(debugInfo);
  }

  @Post('test-post')
  testPost(@Body() body: any, @Req() req: Request) {
    console.log('=== TEST POST ENDPOINT CALLED ===');
    console.log('Request body:', body);
    console.log('Request URL:', req.url);
    
    return {
      message: 'POST endpoint working',
      timestamp: new Date().toISOString(),
      receivedBody: body,
      method: req.method,
      url: req.url
    };
  }

  @Get('version')
  getVersion() {
    console.log('📋 Version endpoint called!');
    return {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      buildTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3000,
      nodeVersion: process.version,
      message: 'Version endpoint working - this confirms the latest deployment'
    };
  }
}
