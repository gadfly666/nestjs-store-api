import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './user.dto';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    private readonly logger: Logger = new Logger(UserService.name)

    constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

    async register(dto: RegisterDto): Promise<void> {

        var user: User = await this.repository.findOne({
          where: {
            "username": dto.username,
          }
        });
    
        if (user) {
          throw new ConflictException(dto.username, "User with the same username is existed");
        }

        user = this.mapper.map(dto, RegisterDto, User);
        this.logger.log(`Mapped user ${JSON.stringify(user)}`);
        // TODO rethink about anonymous and customer role
        user.role = UserRole.ANONYMOUS

        const salt = await bcrypt.genSalt();
        user.passwordHash = await bcrypt.hash(dto.password, salt);

        await this.repository.save(user);
    
      }

}
