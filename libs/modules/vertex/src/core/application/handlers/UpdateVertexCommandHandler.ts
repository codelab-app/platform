import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { VertexDITokens } from '../../../framework/VertexDITokens'
import { Vertex } from '../../domain/vertex'
import { UpdateVertexCommand } from '../commands/UpdateVertexCommand'
import { UpdateVertexUseCase } from '../useCases/updateVertex/UpdateVertexUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateVertexCommand)
export class UpdateVertexCommandHandler
  implements ICommandHandler<UpdateVertexCommand> {
  constructor(
    @Inject(VertexDITokens.UpdateVertexUseCase)
    private readonly service: UpdateVertexUseCase,
  ) {}

  public async execute({ request }: UpdateVertexCommand): Promise<Vertex> {
    const updateVertexResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Vertex>) => results.value,
    )(updateVertexResults)
  }
}
