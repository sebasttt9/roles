import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('user')
export class UserController {
    @Get('test')
    getTest() {
        console.log('🧪 User test endpoint called!');
        return { message: 'User controller is working!', timestamp: new Date().toISOString() };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
    console.log('👨‍💼 Get profile request for user:', req.user?.email || 'unknown');
    return req.user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('admin')
    adminOnly() {
    console.log('⚡ Admin endpoint accessed!');
    return { message: 'Solo los ADMIN pueden ver esto' };
    }
}
