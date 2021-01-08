import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Option } from 'fp-ts/Option'
import { UserDITokens } from '../../../framework/UserDITokens'
import { ValidateUserCommand } from '../commands/ValidateUserCommand'
import { ValidateUserService } from '../useCases/validateUser/ValidateUser.service'
import { User } from '@codelab/modules/user'

@CommandHandler(ValidateUserCommand)
export class ValidateUserCommandHandler
  implements ICommandHandler<ValidateUserCommand> {
  constructor(
    @Inject(UserDITokens.ValidateUserUseCase)
    public readonly service: ValidateUserService,
  ) {}

  async execute({ request }: ValidateUserCommand): Promise<Option<User>> {
    return this.service.execute(request)
  }
}
