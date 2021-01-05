import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../../../../../backend/src/infrastructure/auth/CurrentUser'
import { GqlAuthGuard } from '../../../../../backend/src/infrastructure/auth/gql-auth.guard'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { GetMeQuery } from '../../core/application/commands/GetMeQuery'
import { LoginUserCommand } from '../../core/application/commands/LoginUserCommand'
import { RegisterUserCommand } from '../../core/application/commands/RegisterUserCommand'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { DeleteUserRequest } from '../../core/application/useCases/deleteUser/DeleteUserRequest'
import { GetMeRequest } from '../../core/application/useCases/getMe/GetMeRequest'
import { LoginUserRequest } from '../../core/application/useCases/loginUser/LoginUserRequest'
import { RegisterUserRequest } from '../../core/application/useCases/registerUser/RegisterUserRequest'
import { UpdateUserRequest } from '../../core/application/useCases/updateUser/UpdateUserRequest'
import { User } from '../../core/domain/user'
import {
  CommandQueryBusPort,
  TypeOrmUser,
  UseCaseRequestPort,
} from '@codelab/backend'

/**
 * An adapter for GraphQL User resolvers.
 *
 * @remarks
 * Converts a GraphQL resolver to a use case command or query
 *
 * @inheritDoc CommandQueryBusPort
 */
@Resolver(() => TypeOrmUser)
@Injectable()
export class UserCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  // Use email as placeholder for now
  // @Query(() => [UserUseCaseDto])
  // async users(@Args('email') request: GetUserRequest) {
  //   const users = await this.queryBus.execute(new GetUsersQuery(request))

  //   return User.arrayToPlain(users)
  // }

  @Mutation((returns) => UserUseCaseDto)
  async deleteUser(@Args('user') request: DeleteUserRequest) {
    const user = await this.commandBus.execute(new DeleteUserCommand(request))

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async updateUser(@Args('user') request: UpdateUserRequest) {
    const user: User = await this.commandBus.execute(
      new UpdateUserCommand(request),
    )

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async registerUser(@Args('request') request: RegisterUserRequest) {
    const user: User = await this.commandBus.execute(
      new RegisterUserCommand(request),
    )

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async loginUser(@Args('request') request: LoginUserRequest) {
    const result = await this.queryBus.execute(new LoginUserCommand(request))

    return result.toPlain()
  }

  @Query((returns) => UserUseCaseDto)
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() userId: string) {
    const request: GetMeRequest = { userId }
    const result = await this.queryBus.execute(new GetMeQuery(request))

    return result.toPlain()
  }
}
