import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateAccountInput } from "./dto/create-account.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service"

describe('UserService', () => {
    let service: UserService;
    let userRepository: UserRepository;

    enum UserRole {Admin, Member};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, UserRepository]
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe("회원 생성", () => {
        const createAccountInput: CreateAccountInput = {
            email: 'lzao@naver.com',
            password: '123',
            nickname: 'lzao',
            role: UserRole.Member
        };
        const createUser = User.of(createAccountInput);
        it("회원 생성 시 에러가 발생하면 에러 메세지를 보여줍니다.", async() => {
            try {
                const findUserRepositorySpy = jest.spyOn(userRepository, "findOne").mockResolvedValue(null);
                await service.createAccount(createAccountInput);
            } catch (e) {
                expect(e.message).toBe({ok: false, error: "계정을 생성할 수 없습니다."});
            }
        });
        it("회원을 생성할 때 이메일이 중복되면 에러를 발생합니다", async() => {
            const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne')
                .mockResolvedValue(createUser);
            const result = await service.createAccount(createAccountInput);
            expect(result).toEqual({ok:false, error: "이미 가입된 이메일 입니다."});
        });
        it("하나의 회원을 생성합니다.", async () => {            
            const saveUser: User = {
                id: 1,
                ...createAccountInput,
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now())
            };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            jest.spyOn(userRepository, 'create').mockReturnValue(createUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(saveUser);
            const result = await service.createAccount(createAccountInput);
            expect(result).toEqual({ok:true});
        });
    });
});