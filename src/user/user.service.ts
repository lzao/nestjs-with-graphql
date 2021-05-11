import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

    // 계정생성
    async createAccount(createAccountInput: CreateAccountInput): Promise<{ ok: Boolean, error?: String }> {
        // check exist email
        try {
            if (await this.users.findOne( {email: createAccountInput.email} )) {
                // show exist email error
                return {ok: false, error: "이미 가입된 이메일 입니다."};
            }
            // create email account
            const createUser = this.users.create(createAccountInput);
            this.users.save(createUser);
            return {ok: true};
        } catch (e) {
            // TODO: logging error
            return {ok: false, error: "계정을 생성할 수 없습니다."};
        }
        
    }
}
