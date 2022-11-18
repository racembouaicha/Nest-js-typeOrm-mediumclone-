import { UserEntity } from '@app/Entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guards/auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports :[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports:[UserService]
})
export class UserModule {}
