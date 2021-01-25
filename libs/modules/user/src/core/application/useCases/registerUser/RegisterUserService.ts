import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { AuthService } from '../../services/AuthService'
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

    user.hashPassword()

    const userAlreadyExists = await this.userRepository.exists({
      email: user.email.toString(),
    })

    if (userAlreadyExists) {
      return left(
        new RegisterUserErrors.EmailAlreadyExistsError(user.email.toString()),
      )
    }

    const newUserOpt = await this.userRepository.create(user)

    if (isNone(newUserOpt)) {
      return left(
        new RegisterUserErrors.CreateUserError('Unable to create user'),
      )
    }

    const newUser = newUserOpt.value

    const accessToken = await this.authService.getToken(newUser)

    newUser.setAccessToken(accessToken)

    return right(Result.ok(newUser))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
