import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Resolver } from '@nestjs/graphql'
import {
  CommandQueryBusPort,
  TypeOrmPage,
  UseCaseRequestPort,
} from '@codelab/backend'

@Resolver(() => TypeOrmPage)
@Injectable()
export class PageCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  // @Query(() => [PageQueryUseCaseDto])
  // async pages() {
  //   const results = await this.queryBus.execute(new GetPageQuery())

  //   return Page.arrayToPlain(results)
  // }
}
