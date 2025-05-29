import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ example: 'usuario@correo.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'MiClaveSegura123' })
    @IsString()
    @MinLength(6)
    password: string;
}
