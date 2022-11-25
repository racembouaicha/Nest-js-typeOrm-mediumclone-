import { ArticleEntity } from '@app/Entity/Article.entity';
import { UserEntity } from '@app/Entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesReponse.interface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async findAll(currentUserId: number, query: any): Promise<ArticlesResponseInterface> {
        const queryBuilder = this.articleRepository.createQueryBuilder('articles').leftJoinAndSelect('articles.author', 'author');
 

        if(query.tag){
            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                tag : `%${query.tag}`
            })
        }

        if(query.author){
            const author = await this.userRepository.findOne({
                where:{
                      username:query.author
            }});
            queryBuilder.andWhere('articles.authorId = :id', {
                id: author.id
            })
        }

        queryBuilder.orderBy('articles.createdAt', 'DESC');
        const articlesCount = await queryBuilder.getCount();
        
        if(query.limit) {
            queryBuilder.limit(query.limit);
        }
        if(query.offset) {
            queryBuilder.offset(query.offset);
        }
        
        const articles = await queryBuilder.getMany();
        return {articles,articlesCount};
    }

    async createArticle(currentUser: UserEntity, CreateArticleDto: CreateArticleDto): Promise<ArticleEntity>{
        const article = new ArticleEntity()
        Object.assign(article, CreateArticleDto);
        if(!article.tagList){
            article.tagList = [];
        }

        article.slug = this.getSlug(CreateArticleDto.title); 

        article.author = currentUser
        return await this.articleRepository.save(article);
    }

    async deleteArticle(slug: string, currentUserId: number ) :Promise<DeleteResult> {
        const article = await this.findBySlug(slug)

        if(!article){
            throw new HttpException('Article does not exists',HttpStatus.NOT_FOUND);
        }
        if( article.author.id !== currentUserId) {
            throw new HttpException('you are not a author',HttpStatus.FORBIDDEN);
        }
        return await  this.articleRepository.delete({slug});
    }

    async updateArticle(
        slug: string, 
        updateArticleDto: CreateArticleDto,
        currentUserId: number, 
    ):Promise<ArticleEntity>{
        const article = await this.findBySlug(slug)

        if(!article){
            throw new HttpException('Article does not exists',HttpStatus.NOT_FOUND);
        }
        if( article.author.id !== currentUserId) {
            throw new HttpException('you are not a author',HttpStatus.FORBIDDEN);
        }

        Object.assign(article, updateArticleDto);

        return await this.articleRepository.save(article);

    }

    async findBySlug(slug: string): Promise<ArticleEntity> {
        return await this.articleRepository.findOne(
            {where:
                { slug:slug }
            });
    }

    buildArticleResponse(article:ArticleEntity):ArticleResponseInterface {
        return {article};
    }

    private getSlug(title : string):string {
        return (
            slugify(title, {lower: true}) + 
            '-' + ((Math.random() * Math.pow(36, 6)| 0).toString())
        )
    }
}
