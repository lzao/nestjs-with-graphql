import { CoreEntity } from "src/common/core.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class User extends CoreEntity {
    @Column()
    user_id: String;

    @Column()
    user_pw: String;

    @Column()
    nickname: String;
}