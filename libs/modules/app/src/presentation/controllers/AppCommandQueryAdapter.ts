import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { classToPlain } from 'class-transformer'
import { CreateAppCommand } from '../../core/application/commands/CreateAppCommand'
import { DeleteAppCommand } from '../../core/application/commands/DeleteAppCommand'
import { GetAppsQuery } from '../../core/application/commands/GetAppsQuery'
import { AppDto } from '../../core/application/useCases/AppDto'
import { CreateAppInput } from '../../core/application/useCases/createApp/CreateAppInput'
import { DeleteAppRequest } from '../../core/application/useCases/deleteApp/DeleteAppRequest'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
  TypeOrmApp,
  UUID,
  UseCaseRequestPort,
} from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => TypeOrmApp)
@Injectable()
export class AppCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Mutation((returns) => AppDto)
  @UseGuards(GqlAuthGuard)
  async createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() user: User,
  ) {
    const results = await this.commandBus.execute(
      new CreateAppCommand({ ...input, user }),
    )

    return results.toPlain()
  }

  @Query((returns) => [AppDto])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: User<UUID>) {
    const results = await this.queryBus.execute(new GetAppsQuery({ user }))

    return classToPlain(results)
  }

  @Mutation((returns) => AppDto)
  @UseGuards(GqlAuthGuard)
  async deleteApp(@Args('request') request: DeleteAppRequest) {
    const result = await this.commandBus.execute(new DeleteAppCommand(request))

    return result.toPlain()
  }
}
