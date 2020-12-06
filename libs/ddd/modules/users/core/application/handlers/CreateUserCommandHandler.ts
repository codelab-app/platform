import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { classToPlain } from 'class-transformer'
import { fold } from 'fp-ts/lib/Either'
import { UserDITokens } from '../../../infrastructure/adapter/UserDITokens'
import { User } from '../../domain/user'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { UserUseCaseDto } from '../useCases/UserUseCaseDto'
import { CreateUserErrors } from '../useCases/createUser/CreateUserErrors'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { Result } from '@codelab/ddd/shared/core'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly service: CreateUserUseCase,
  ) {}

  public async execute(command: CreateUserCommand): Promise<UserUseCaseDto> {
    const createUserResults = await this.service.execute(command)

    return fold<CreateUserErrors.EmailAlreadyExistsError, Result<User>, any>(
      (errors) => {
        throw errors
      },
      (results) => classToPlain(results.value) as UserUseCaseDto,
    )(createUserResults)
  }
}
