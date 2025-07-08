import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

console.log('👥 Loading UserModule...');

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {
  constructor() {
    console.log('✅ UserModule initialized with UserController');
    console.log('🛣️  User routes: GET /user/me, GET /user/admin, GET /user/test');
  }
}
