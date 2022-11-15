import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController } from './tag.controller';
import { TagEntity } from '../Entity/tag.entity';
import { TagsService } from './tag.service';

@Module({
  imports :[TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
