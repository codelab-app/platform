import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserDITokens } from '../../../framework/UserDITokens'
import { UserDto } from '../../../presentation/UserDto'
import { ValidateUserCommand } from '../commands/ValidateUserCommand'
import { ValidateUserService } from '../useCases/validateUser/ValidateUserService'

@CommandHandler(ValidateUserCommand)
export class ValidateUserCommandHandler
  implements ICommandHandler<ValidateUserCommand> {
  constructor(
    @Inject(UserDITokens.ValidateUserUseCase)
    public readonly service: ValidateUserService,
  ) {}

  async execute({ request }: ValidateUserCommand): Promise<UserDto> {
    return await this.service.execute(request)
  }
}
