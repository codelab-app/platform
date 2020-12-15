import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { UserDITokens } from '../../../framework/UserDITokens'
import { User } from '../../domain/user'
import { UpdateUserCommand } from '../commands/UpdateUserCommand'
import { UserUseCaseDto } from '../useCases/UserUseCaseDto'
import { UpdateUserUseCase } from '../useCases/updateUser/UpdateUserUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserDITokens.EditUserUseCase)
    private readonly service: UpdateUserUseCase,
  ) {}

  async execute({ request }: UpdateUserCommand): Promise<UserUseCaseDto> {
    const updateUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => (results.value as unknown) as UserUseCaseDto,
    )(updateUserResults)
  }
}
