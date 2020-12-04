import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserDITokens } from '../../../infrastructure/adapter/UserDITokens'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly service: CreateUserUseCase,
  ) {}

  public async execute(command: CreateUserCommand): Promise<any> {
    return this.service.execute(command)
  }
}
