import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { option as O } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { AuthService } from '../../services/AuthService'
import { LoginUserErrors } from './LoginUserErrors'
import { LoginUserRequest } from './LoginUserRequest'
import { LoginUserResponse } from './LoginUserResponse'
import { LoginUserUseCase } from './LoginUserUseCase'
import { Result } from '@codelab/backend'

export class LoginUserService implements LoginUserUseCase, OnModuleInit {
  declare authService: AuthService

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const existingUser: Option<User> = await this.userRepository.findOne({
      email: request.email.toString(),
    })

    if (O.isNone(existingUser)) {
      return left(
        new LoginUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const user: User = existingUser.value
    const passwordMatch = user.comparePassword(request.password)

    if (!passwordMatch) {
      return left(new LoginUserErrors.WrongPasswordError())
    }

    const token = await this.authService.getToken(user)

    user.setAccessToken(token)

    return right(Result.ok(user))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
