import { Controller, Get } from '@nestjs/common';
import { TagEntity } from '../Entity/tag.entity';
import { TagsService } from './tag.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService){}

    @Get()
    findAll(): Promise<TagEntity[]> {
        return this.tagsService.findAll();
    }
}
