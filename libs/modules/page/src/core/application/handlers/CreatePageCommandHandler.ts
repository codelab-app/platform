import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { PageDITokens } from '../../../framework/PageDITokens'
import { Page } from '../../domain/page'
import { CreatePageCommand } from '../commands/CreatePageCommand'
import { CreatePageUseCase } from '../useCases/createPage/CreatePageUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreatePageCommand)
export class CreatePageCommandHandler
  implements ICommandHandler<CreatePageCommand> {
  constructor(
    @Inject(PageDITokens.CreatePageUseCase)
    private readonly service: CreatePageUseCase,
  ) {}

  public async execute({ request }: CreatePageCommand): Promise<Page> {
    const createPageResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Page>) => results.value,
    )(createPageResults)
  }
}
