import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserDITokens } from '../../../framework/UserDITokens'
import { ValidateUserCommand } from '../commands/ValidateUserCommand'
import { ValidateUserService } from '../useCases/validateUser/ValidateUserService'
import { User } from '@codelab/modules/user'

@CommandHandler(ValidateUserCommand)
export class ValidateUserCommandHandler
  implements ICommandHandler<ValidateUserCommand> {
  constructor(
    @Inject(UserDITokens.ValidateUserUseCase)
    public readonly service: ValidateUserService,
  ) {}

  async execute({ request }: ValidateUserCommand): Promise<User> {
    return this.service.execute(request)
  }
}
