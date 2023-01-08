import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerGroupController } from './customer_group.controller';
import { CustomerGroup } from './customer_group.entity';
import { CustomerGroupProfile } from './customer_group.profile';
import { CustomerGroupService } from './customer_group.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGroup])],
  providers: [CustomerGroupProfile, CustomerGroupService],
  controllers: [CustomerGroupController]
})
export class CustomerGroupModule {}
