import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { User } from './user.schema'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

export const MockUserModel: jest.Mock = jest.fn()
MockUserModel.prototype.save = jest.fn()

describe('User module', () => {
  let userService: UserService
  let userServiceSpy: jest.SpyInstance
  let mockUserModelSpy: jest.SpyInstance

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile()

    userService = userModule.get<UserService>(UserService)
    userServiceSpy = jest.spyOn(userService, 'create')
    mockUserModelSpy = jest.spyOn(MockUserModel.prototype, 'save')
  })

  it('should create a user', () => {
    const createUserDto: CreateUserDto = {
      username: 'Codelab',
      password: 'pass',
    }

    userService.create(createUserDto)

    expect(userServiceSpy).toHaveBeenCalledWith(createUserDto)
    expect(MockUserModel).toHaveBeenCalledWith(createUserDto)
    expect(mockUserModelSpy).toHaveBeenCalled()
  })
})
