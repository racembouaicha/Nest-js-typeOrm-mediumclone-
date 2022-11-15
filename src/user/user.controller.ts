import { UserEntity } from '@app/Entity/User.entity';
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService){}
   
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user)
    }
}
