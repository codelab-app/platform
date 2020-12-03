import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../../core/domain/user'
import { UserInput } from '../../infrastructure/dto/UserInput'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

@Resolver(() => TypeOrmUser)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((returns) => User)
  async createUser(@Args('user') user: UserInput) {
    return null
  }
}
