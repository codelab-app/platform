import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { classToPlain } from 'class-transformer'
import { CurrentUser } from '../../../../../backend/src/infrastructure/auth/CurrentUser'
import { GqlAuthGuard } from '../../../../../backend/src/infrastructure/auth/gql-auth.guard'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { CreateAppCommand } from '../../core/application/commands/CreateAppCommand'
import { GetAppsQuery } from '../../core/application/commands/GetAppsQuery'
import { AppDto } from '../../core/application/useCases/AppDto'
import { CreateAppRequest } from '../../core/application/useCases/createApp/CreateAppRequest'
import { GetAppsRequest } from '../../core/application/useCases/getApps/GetAppsRequest'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

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
    @Args('request') request: CreateAppRequest,
    @CurrentUser() userId: string,
  ) {
    const results = await this.commandBus.execute(
      new CreateAppCommand({ ...request, userId }),
    )

    return results.toPlain()
  }

  @Query((returns) => [AppDto])
  async getApps(
    @Args('request') request: GetAppsRequest,
    @CurrentUser() userId: string,
  ) {
    const results = await this.queryBus.execute(new GetAppsQuery(request))

    return classToPlain(results)
  }
}
