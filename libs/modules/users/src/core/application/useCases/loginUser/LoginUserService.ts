import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { AuthService } from '../../../../../../../backend/src/infrastructure/auth/auth.service'
import { UsersRepositoryPort } from '../../../adapters/UsersRepositoryPort'
import { User } from '../../../domain/user'
import { LoginUserErrors } from './LoginUserErrors'
import { LoginUserRequest } from './LoginUserRequest'
import { LoginUserResponse } from './LoginUserResponse'
import { LoginUserUseCase } from './LoginUserUseCase'
import { Result } from '@codelab/backend'

export class LoginUserService implements LoginUserUseCase, OnModuleInit {
  declare authService: AuthService

  constructor(
    private readonly usersRepository: UsersRepositoryPort,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const existingUser: Option<User> = await this.usersRepository.findUser({
      email: request.email.toString(),
    })

    if (O.isNone(existingUser)) {
      return left(
        new LoginUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const user: User = existingUser.value
    const passwordMatch = user.password.comparePassword(request.password)

    if (!passwordMatch) {
      return left(new LoginUserErrors.WrongPasswordError())
    }

    user.setAccessToken = await this.authService.getToken(user)

    return right(Result.ok(user))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
