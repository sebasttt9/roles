import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Registro de usuario' })
    register(@Body() body: AuthDto) {
    return this.auth.register(body.email, body.password);
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicio de sesión de usuario' })
    login(@Body() body: AuthDto) {
    return this.auth.login(body.email, body.password);
    }
}
