import { UserEntity } from '@app/Entity/user.entity';
import { Controller, Post, Body, UsePipes, ValidationPipe, Req, Get, UseGuards, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface} from './types/userResponse.interface';
import { UserService } from './user.service';
import {Request} from 'express-serve-static-core'
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}
   
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user)
    }

    @Post('user/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto);
        console.log('login :',loginUserDto)
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user:UserEntity,): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId:number,
        @Body('user') updateUserDto: UpdateUserDto
        ):Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(currentUserId,updateUserDto)
        return this.userService.buildUserResponse(user);
    }

}
