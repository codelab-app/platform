import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { classToPlain } from 'class-transformer'
import { fold } from 'fp-ts/Either'
import { UserDITokens } from '../../../framework/UserDITokens'
import { User } from '../../domain/user'
import { EditUserCommand } from '../commands/EditUserCommand'
import { UserUseCaseDto } from '../useCases/UserUseCaseDto'
import { EditUserUseCase } from '../useCases/editUser/EditUserUseCase'
import { Result } from '@codelab/ddd/backend'

@CommandHandler(EditUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<EditUserCommand> {
  constructor(
    @Inject(UserDITokens.EditUserUseCase)
    private readonly service: EditUserUseCase,
  ) {}

  async execute({ request }: EditUserCommand): Promise<UserUseCaseDto> {
    const updateUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<User>) => classToPlain(results.value) as UserUseCaseDto,
    )(updateUserResults)
  }
}
