import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "../common/core.entity";
import { Column, Entity } from "typeorm";

enum UserRole {
    Admin,
    Member
};

registerEnumType(UserRole, {name:"UserRole"});


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Column()
    @Field(type => String)
    email: string;

    @Column()
    @Field(type => String)
    password: string;

    @Column()
    @Field(type => String)
    nickname: string;

    @Column({type: 'enum', enum: UserRole})
    @Field(type => UserRole)
    role: UserRole;

    public static of(params: Partial<User>): User {
        const user = new User();
    
        Object.assign(user, params);
    
        return user;
    }
}