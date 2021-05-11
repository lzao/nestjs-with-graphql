import { ObjectType, PickType, Field, InputType } from "@nestjs/graphql";
import { User } from "../user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, ["email", "password", "nickname"]) {}

@ObjectType()
export class CreateAccountOutput {
    @Field(type => String, { nullable: true})
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}