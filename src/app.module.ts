import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '@app/tags/tag.module';
import { UserModule } from '@app/user/user.module';
import ormconfig from '@app/ormconfig';


@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagsModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
