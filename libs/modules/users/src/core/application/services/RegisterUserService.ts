import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { plainToClass } from 'class-transformer'
import { left, right } from 'fp-ts/lib/Either'
import { AuthService } from '../../../../../auth/src/lib/auth.service'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { RegisterUserErrors } from '../useCases/RegisterUser/RegisterUserErrors'
import { RegisterUserRequest } from '../useCases/RegisterUser/RegisterUserRequest'
import { RegisterUserResponse } from '../useCases/RegisterUser/RegisterUserResponse'
import { RegisterUserUseCase } from '../useCases/RegisterUser/RegisterUserUseCase'
import { Result } from '@codelab/backend'

export class RegisterUserService implements RegisterUserUseCase, OnModuleInit {
  declare authService: AuthService

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const user = User.create(request)

    const userAlreadyExists = await this.userRepository.exists({
      email: user.email.toString(),
    })

    if (userAlreadyExists) {
      return left(
        new RegisterUserErrors.EmailAlreadyExistsError(user.email.toString()),
      )
    }

    const persistedUser = await this.userRepository.createUser(user)

    const u = persistedUser.toPlain()
    const token = await this.authService.getToken(u)

    u.accessToken = token

    return right(Result.ok(plainToClass(User, u)))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
