import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { DeleteResult } from 'typeorm'
import { UserDITokens } from '../../../framework/UserDITokens'
import { DeleteUserCommand } from '../commands/DeleteUserCommand'
import { DeleteUserUseCase } from '../useCases/deleteUser/DeleteUserUseCase'
import { Result } from '@codelab/ddd/backend'

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(UserDITokens.DeleteUserUseCase)
    private readonly service: DeleteUserUseCase,
  ) {}

  async execute({ request }: DeleteUserCommand): Promise<DeleteResult> {
    const deleteUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<DeleteResult>) => results.value,
    )(deleteUserResults)
  }
}
