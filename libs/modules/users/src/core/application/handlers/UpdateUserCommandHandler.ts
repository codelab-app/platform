import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { UsersDITokens } from '../../../framework/UsersDITokens'
import { User } from '../../domain/user'
import { UpdateUserCommand } from '../commands/UpdateUserCommand'
import { UpdateUserUseCase } from '../useCases/updateUser/UpdateUserUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UsersDITokens.EditUserUseCase)
    private readonly service: UpdateUserUseCase,
  ) {}

  async execute({ request }: UpdateUserCommand): Promise<User> {
    const updateUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => results.value,
    )(updateUserResults)
  }
}
