import { ArticleEntity } from "@app/Entity/Article.entity";

export interface ArticlesResponseInterface {
    articles : ArticleEntity[],
    articlesCount : number
}