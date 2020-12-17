import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { VertexDITokens } from '../../../framework/VertexDITokens'
import { Vertex } from '../../domain/vertex'
import { CreateVertexCommand } from '../commands/CreateVertexCommand'
import { CreateVertexUseCase } from '../useCases/createVertex/CreateVertexUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreateVertexCommand)
export class CreateVertexCommandHandler
  implements ICommandHandler<CreateVertexCommand> {
  constructor(
    @Inject(VertexDITokens.CreateVertexUseCase)
    private readonly service: CreateVertexUseCase,
  ) {}

  public async execute({ request }: CreateVertexCommand): Promise<Vertex> {
    const createVertexResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Vertex>) => results.value,
    )(createVertexResults)
  }
}
