import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { UsersDITokens } from '../../../framework/UsersDITokens'
import { User } from '../../domain/user'
import { LoginUserQuery } from '../commands/LoginUserQuery'
import { LoginUserUseCase } from '../useCases/loginUser/LoginUserUseCase'
import { Result } from '@codelab/backend'

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    @Inject(UsersDITokens.LoginUserUseCase)
    private readonly service: LoginUserUseCase,
  ) {}

  public async execute({ request }: LoginUserQuery): Promise<User> {
    const LoginUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => results.value,
    )(LoginUserResults)
  }
}
