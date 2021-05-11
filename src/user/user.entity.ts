import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { Column, Entity } from "typeorm";

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
}