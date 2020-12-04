import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserCommand } from '../../core/application/commands/CreateUserCommand'
import { CreateUserRequest } from '../../core/application/useCases/createUser/CreateUserRequest'
import { User } from '../../core/domain/user'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

@Resolver(() => TypeOrmUser)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args('user') request: CreateUserRequest) {
    return this.commandBus.execute(new CreateUserCommand(request))
  }
}
