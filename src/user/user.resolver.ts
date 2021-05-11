
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const {ok, error} = await this.userService.createAccount(createAccountInput);
            return {
                error,
                ok
            };
        } catch (error) {
            return {
                error,
                ok: false
            }
        }
    }
}