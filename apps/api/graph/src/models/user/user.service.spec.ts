import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/jwt.strategy'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import Mock = jest.Mock

type MockType<Repository> = { save: Mock; create: Mock }

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
  }),
)

const mockConfig: ConfigService = {
  get(key: string) {
    switch (key) {
      case 'CODELAB_ENV':
        return 'e2e'
      case 'TYPEORM_SEED':
        return true
      case 'JWT_SECRET':
        return 'something'
      case 'JWT_EXPIRY':
        return 3600
      default:
        return ''
    }
  },
} as ConfigService

describe('UserService', () => {
  let userService: UserService
  let userRepositoryMock: MockType<Repository<UserEntity>>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: JwtStrategy,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: mockConfig,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepositoryMock = module.get(getRepositoryToken(UserEntity))
  })

  it('Should handle password hashing when creating an account', async () => {
    const email = 'codelab@gmail.com'
    const password = 'password'
    const hashedPassword =
      '$2b$10$IWePpeMddiEWl0E9NRpp3OMM5J7xCufgCFscIO2C4mVrZ.Fe9cdOK'
    const u = new UserEntity()

    u.email = email
    u.password = password
    userRepositoryMock.save.mockReturnValue(
      Promise.resolve({
        email,
        password: hashedPassword,
      }),
    )

    const newUser = await userService.createNewUser({ email, password })

    expect(newUser.email).toEqual(email)
    expect(newUser.password).toEqual(hashedPassword)
  })
})
