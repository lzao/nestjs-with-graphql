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
    email: String;

    @Column()
    @Field(type => String)
    password: String;

    @Column()
    @Field(type => String)
    nickname: String;

    @Column({type: 'enum', enum: UserRole})
    @Field(type => UserRole)
    role: UserRole;

    public static of(params: Partial<User>): User {
        const user = new User();
    
        Object.assign(user, params);
    
        return user;
    }
}