import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async hashPassword(entity: User): Promise<void> {
        entity.password = await bcrypt.hash(entity.password, bcrypt.genSaltSync(10));
    }

    beforeInsert(event: InsertEvent<User>): Promise<void> {
        return this.hashPassword(event.entity);
    }

    async beforeUpdate({entity, databaseEntity}: UpdateEvent<User>): Promise<void> {
        if (entity.password !== databaseEntity?.password) {
            await this.hashPassword(entity);
        }
    }
}