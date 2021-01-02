import { OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { AuthService } from '../../../../../auth/src/lib/auth.service'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { LoginUserErrors } from '../useCases/LoginUser/LoginUserErrors'
import { LoginUserRequest } from '../useCases/LoginUser/LoginUserRequest'
import { LoginUserResponse } from '../useCases/LoginUser/LoginUserResponse'
import { LoginUserUseCase } from '../useCases/LoginUser/LoginUserUseCase'
import { Result } from '@codelab/backend'

export class LoginUserService implements LoginUserUseCase, OnModuleInit {
  declare authService: AuthService

  constructor(
    private readonly usersRepository: UserRepositoryPort,
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

    const u: User = existingUser.value
    const passwordMatch = u.password.comparePassword(request.password)

    if (!passwordMatch) {
      return left(new LoginUserErrors.WrongPasswordError())
    }

    const plainUser = u.toPlain()
    const token = await this.authService.getToken(plainUser)

    plainUser.accessToken = token

    return right(Result.ok(plainToClass(User, plainUser)))
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}
