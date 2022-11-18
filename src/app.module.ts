import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '@app/tags/tag.module';
import { UserModule } from '@app/user/user.module';
import ormconfig from '@app/ormconfig';
import { AuthMiddleware } from './user/middlewares/auth.middleware';


@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagsModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path:'*',
      method: RequestMethod.ALL,
    })
  }
}
