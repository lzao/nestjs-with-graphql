import { Field } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: Number;

    @CreateDateColumn()
    @Field(type => Date)
    created_at: Date

    @UpdateDateColumn()
    @Field(type => Date)
    updated_at: Date
}