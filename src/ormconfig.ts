import { DataSourceOptions } from "typeorm";
import { ArticleEntity } from "./Entity/Article.entity";
import { TagEntity } from "./Entity/tag.entity";
import { UserEntity } from "./Entity/user.entity";


const ormconfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'clone',
    entities : [UserEntity,TagEntity,ArticleEntity],
    synchronize: true,
 
    
}
export default ormconfig;