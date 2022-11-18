import { ArticleEntity } from '@app/Entity/Article.entity';
import { UserEntity } from '@app/Entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ){}

    async createArticle(currentUser: UserEntity, CreateArticleDto: CreateArticleDto): Promise<ArticleEntity>{
        const article = new ArticleEntity()
        Object.assign(article, CreateArticleDto);
        if(!article.tagList){
            article.tagList = [];
        }

        article.slug = 'slug'; 

        article.author = currentUser
        return await this.articleRepository.save(article);
    }
}
