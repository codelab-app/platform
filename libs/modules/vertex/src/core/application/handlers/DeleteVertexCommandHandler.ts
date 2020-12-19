import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { VertexDITokens } from '../../../framework/VertexDITokens'
import { Vertex } from '../../domain/vertex'
import { DeleteVertexCommand } from '../commands/DeleteVertexCommand'
import { DeleteVertexUseCase } from '../useCases/deleteVertex/DeleteVertexUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(DeleteVertexCommand)
export class DeleteVertexCommandHandler
  implements ICommandHandler<DeleteVertexCommand> {
  constructor(
    @Inject(VertexDITokens.DeleteVertexUseCase)
    private readonly service: DeleteVertexUseCase,
  ) {}

  public async execute({ request }: DeleteVertexCommand): Promise<Vertex> {
    const deleteVertexResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Vertex>) => results.value,
    )(deleteVertexResults)
  }
}
