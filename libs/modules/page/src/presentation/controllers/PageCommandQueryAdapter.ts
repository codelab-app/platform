import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { PageUseCaseDto } from '../../core/application/useCases/PageUseCaseDto'
import { CreatePageRequest } from '../../core/application/useCases/createPage/CreatePageRequest'
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

  @Mutation(() => PageUseCaseDto)
  async createPage(@Args('request') request: CreatePageRequest) {
    const page: Page = await this.commandBus.execute(
      new CreatePageCommand(request),
    )
    const plainPage = page.toPlain()

    return plainPage
  }
}
