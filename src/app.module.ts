import { Module, RequestMethod, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from '@automapper/classes';
import { GiftCardModule } from './gift_card/gift_card.module';
import { CollectionModule } from './collection/collection.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerGroupModule } from './customer_group/customer_group.module';
import { DiscountModule } from './discount/discount.module';
import { DiscountConditionModule } from './discount_condition/discount_condition.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SystemExceptionFilter } from './app.filter'
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { RequestLogMiddleware } from './app.middleware';

const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE || 'shopping',
  autoLoadEntities: true,
  // TODO disable on production
  synchronize: true,
})

@Module({
  imports: [
    ProductModule, 
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    GiftCardModule,
    CollectionModule,
    CustomerModule,
    CustomerGroupModule,
    DiscountModule,
    DiscountConditionModule,
    UserModule,
    AuthModule,
    // WinstonModule.forRoot({
    //   level: process.env.LOG_LEVEL || 'info',
    //   format: process.env.NODE_ENV !== 'production' ? format.simple() : format.json(),
    //   transports: [
    //     new transports.Console(),
    //   ]
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, SystemExceptionFilter, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}