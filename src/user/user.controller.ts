import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('user')
export class UserController {
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
    return req.user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('admin')
    adminOnly() {
    return { message: 'Solo los ADMIN pueden ver esto' };
    }
}
