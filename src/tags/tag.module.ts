import { Module } from '@nestjs/common';
import { TagsController } from './tag.controller';
import { TagsService } from './tag.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
