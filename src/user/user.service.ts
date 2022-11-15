import * as dotenv from "dotenv";
import { UserEntity } from '@app/Entity/User.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    async createUser(createUserDto : CreateUserDto): Promise<UserEntity>{
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        console.log('newUser', newUser);
        console.log('secret',process.env.JWT_SECRET)
        return  this.userRepository.save(newUser) ;
    }
    generatejwt(user: UserEntity):string {
        return sign({
            id: user.id,
            email: user.email
        }, 'ffff');
    }
    buildUserResponse(user: UserEntity): any {
        return {
            user: {
                ...user,
                token: this.generatejwt(user)
            }
        }
    }
}
