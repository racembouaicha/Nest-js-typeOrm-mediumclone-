import { UserEntity } from '@app/Entity/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}
    
    @Post('create')
    @UseGuards(AuthGuard)
    async createPost(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto,
    ): Promise<any> {

        return await this.articleService.createArticle(currentUser,createArticleDto);
    }
}
