import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { plainToClass } from 'class-transformer'
import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { AuthService } from '../../services/auth.service'
import { RegisterUserErrors } from './RegisterUserErrors'
import { RegisterUserRequest } from './RegisterUserRequest'
import { RegisterUserResponse } from './RegisterUserResponse'
import { RegisterUserUseCase } from './RegisterUserUseCase'
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

    const newUser = await this.userRepository.createUser(user)

    newUser.setAccessToken = await this.authService.getToken(newUser)

    return right(Result.ok(newUser))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
