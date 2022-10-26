import { DataSourceOptions } from "typeorm";


const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: 'db.yrszjzrelqcxdumyvpjm.supabase.co',
    port: 5432,
    username: 'postgres',
    password: 'mediumclone@123',
    database: 'postgres',
    entities : [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}
export default ormconfig;