import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { UserDITokens } from '../../../framework/UserDITokens'
import { SerializedUserDto } from '../../domain/dto/SerializedUserDto'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { UserUseCaseDto } from '../useCases/UserUseCaseDto'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly service: CreateUserUseCase,
  ) {}

  public async execute({
    request,
  }: CreateUserCommand): Promise<UserUseCaseDto> {
    const createUserResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<SerializedUserDto>) => results.value as UserUseCaseDto,
    )(createUserResults)
  }
}
