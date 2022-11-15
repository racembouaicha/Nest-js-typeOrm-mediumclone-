import { DataSourceOptions } from "typeorm";


const ormconfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'clone',
    entities : [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
 
    
}
export default ormconfig;