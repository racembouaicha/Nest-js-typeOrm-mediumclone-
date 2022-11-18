import * as dotenv from "dotenv";
import { UserEntity } from '@app/Entity/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from 'bcrypt';
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    async createUser(createUserDto : CreateUserDto): Promise<UserEntity>{
        const userByEmail = await this.userRepository.findOne(
            {
                where:
                {
                    email: createUserDto.email
                }
            })
        const useByUsername = await this.userRepository.findOne(
            {
                where:
                {
                    username: createUserDto.username,
                }
            })
        if(userByEmail || useByUsername){
            throw new HttpException('Email or username are taken',422);
        }
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

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where:{ 
                id: id,
            }
        })   
    }

    async login(loginUserDto : LoginUserDto) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where:{ 
                email: loginUserDto.email.toLowerCase(),
            },
            select :['id','username','email','bio','image', 'password']
        })


        if(!user){
        throw new HttpException('Crendentials are not valid', 422);
        }

        const isPasswordCorrect = await compare(
            loginUserDto.password,user.password
        )

        if(!isPasswordCorrect){
            throw new HttpException('Crendentials are not valid', 422);
        }

        delete user.password;
        return user
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }
}
