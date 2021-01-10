import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { PageDto } from '../../core/application/useCases/PageDto'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { Page } from '../../core/domain/page'
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

  @Mutation(() => PageDto)
  async createPage(@Args('input') input: CreatePageInput) {
    const page: Page = await this.commandBus.execute(
      new CreatePageCommand(input),
    )
    const plainPage = page.toPlain()

    return plainPage
  }
}
