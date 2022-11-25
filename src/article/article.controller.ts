import { UserEntity } from '@app/Entity/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesReponse.interface';


@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}
    
    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseInterface> {
        return await this.articleService.findAll(currentUserId, query);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createPost(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {

        const article = await this.articleService.createArticle(
            currentUser,
            createArticleDto
            );
    return this.articleService.buildArticleResponse(article);
        }

    @Get(':slug')
    async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article);
    }    

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async  deleteArticle(@User('id') currentUserId : number, @Param('slug') slug : string) {
        return await this.articleService.deleteArticle(slug, currentUserId);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    async updateArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto:CreateArticleDto){
        const article = await this.articleService.updateArticle(
            slug,
            updateArticleDto,
            currentUserId,
        )
        return await this.articleService.buildArticleResponse(article);
    }
}
