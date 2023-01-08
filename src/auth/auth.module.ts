import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User, UserLoginSession } from '../user/user.entity'; 
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy, JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      //TODO: the jwt secret
      secret: "111111111111",
    }),
    TypeOrmModule.forFeature([User, UserLoginSession]),
    UserModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
