import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { PageDITokens } from '../../../framework/PageDITokens'
import { Page } from '../../domain/page'
import { DeletePageCommand } from '../commands/DeletePageCommand'
import { DeletePageUseCase } from '../useCases/deletePage/DeletePageUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(DeletePageCommand)
export class DeletePageCommandHandler
  implements ICommandHandler<DeletePageCommand> {
  constructor(
    @Inject(PageDITokens.DeletePageUseCase)
    private readonly service: DeletePageUseCase,
  ) {}

  public async execute({ request }: DeletePageCommand): Promise<Page> {
    const DeletePageResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Page>) => results.value,
    )(DeletePageResults)
  }
}
