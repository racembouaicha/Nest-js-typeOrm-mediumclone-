import { Request } from "express";
import { UserEntity } from "@app/Entity/user.entity";

export interface ExpressRequest extends Request {
user?: UserEntity;
}