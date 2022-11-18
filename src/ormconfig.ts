import { DataSourceOptions } from "typeorm";
import { UserEntity } from "./Entity/user.entity";


const ormconfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'clone',
    entities : [UserEntity],
    synchronize: true,
 
    
}
export default ormconfig;