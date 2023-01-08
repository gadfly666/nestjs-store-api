import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerProfile } from './customer.profile';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerProfile, CustomerService], 
  controllers: [CustomerController]
})
export class CustomerModule {}
