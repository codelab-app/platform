import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../../../../../backend/src/infrastructure/auth/CurrentUser'
import { GqlAuthGuard } from '../../../../../backend/src/infrastructure/auth/gql-auth.guard'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { CreateAppCommand } from '../../core/application/commands/CreateAppCommand'
import { AppUseCaseDto } from '../../core/application/useCases/AppUseCaseDto'
import { CreateAppRequest } from '../../core/application/useCases/createApp/CreateAppRequest'
import { CommandQueryBusPort, UseCaseRequestPort } from '@codelab/backend'

@Resolver(() => TypeOrmApp)
@Injectable()
export class AppCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Mutation((returns) => AppUseCaseDto)
  @UseGuards(GqlAuthGuard)
  async createApp(
    @Args('request') request: CreateAppRequest,
    @CurrentUser() userId: string,
  ) {
    console.log(request)
    request.userId = userId
    const result = await this.commandBus.execute(new CreateAppCommand(request))

    return result.toPlain()
  }
}
