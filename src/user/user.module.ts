import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User, UserLoginSession } from './user.entity';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';

@Module({
  imports : [TypeOrmModule.forFeature([User, UserLoginSession])],
  providers: [UserService, UserProfile],
  exports: [TypeOrmModule],
  controllers: [UserController]
})
export class UserModule {}