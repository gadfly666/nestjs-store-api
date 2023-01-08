import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.entity';
import { CollectionProfile } from './collection.profile';
import { CollectionService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  providers: [CollectionProfile, CollectionService],
  controllers: [CollectionController]
})
export class CollectionModule {}
