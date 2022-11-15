import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { TagEntity } from '../Entity/tag.entity';
@Injectable()
export class TagsService {
    constructor(@InjectRepository(TagEntity) 
    private readonly tagRepository: Repository<TagEntity>) {}
    
    async findAll():Promise<TagEntity[]> {
        return await this.tagRepository.find()
    }
}
