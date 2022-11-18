import { UserEntity } from "@app/Entity/user.entity";


export type UserType = Omit<UserEntity, 'hashPassword'>;
