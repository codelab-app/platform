import { Inject } from '@nestjs/common'
import { CommandHandler, IQueryHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { UserDITokens } from '../../../framework/UserDITokens'
import { User } from '../../domain/user'
import { LoginUserCommand } from '../commands/LoginUserCommand'
import { LoginUserUseCase } from '../useCases/loginUser/LoginUserUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements IQueryHandler<LoginUserCommand> {
  constructor(
    @Inject(UserDITokens.LoginUserUseCase)
    private readonly service: LoginUserUseCase,
  ) {}

  public async execute({ request }: LoginUserCommand): Promise<User> {
    const LoginUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => results.value,
    )(LoginUserResults)
  }
}
