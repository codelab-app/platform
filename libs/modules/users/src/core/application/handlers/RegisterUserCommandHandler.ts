import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { UsersDITokens } from '../../../framework/UsersDITokens'
import { User } from '../../domain/user'
import { RegisterUserCommand } from '../commands/RegisterUserCommand'
import { RegisterUserUseCase } from '../useCases/registerUser/RegisterUserUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(UsersDITokens.RegisterUserUseCase)
    private readonly service: RegisterUserUseCase,
  ) {}

  public async execute({ request }: RegisterUserCommand): Promise<User> {
    const registerUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => results.value,
    )(registerUserResults)
  }
}
