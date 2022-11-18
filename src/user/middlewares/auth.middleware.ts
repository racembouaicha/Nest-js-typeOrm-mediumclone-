import { ExpressRequest } from '@app/types/expressRequest.interface';
import {Injectable,  NestMiddleware} from '@nestjs/common'
import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { UserService } from '../user.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService){}
 async use(req: ExpressRequest, _:Response, next: NextFunction) {
     if(!req.headers.authorization){
        req.user = null ;
        next();
        return;
     }

     const token = req.headers.authorization.split(' ')[1]
    //  console.log('env',process.env.JWT_SECRET);
     try{
        const decode = verify(token, 'ffff')
        const user = await this.userService.findById(decode.id);
        req.user = user ;
        next();
        // console.log('decode', decode);
     }catch(err){
        console.log(err)
        req.user = null ;
        next();
     }
   
 }
}