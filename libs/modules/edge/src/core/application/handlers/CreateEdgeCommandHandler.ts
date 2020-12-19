import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { EdgeDITokens } from '../../../framework/EdgeDITokens'
import { Edge } from '../../domain/edge'
import { CreateEdgeCommand } from '../commands/CreateEdgeCommand'
import { CreateEdgeUseCase } from '../useCases/createEdge/CreateEdgeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreateEdgeCommand)
export class CreateEdgeCommandHandler
  implements ICommandHandler<CreateEdgeCommand> {
  constructor(
    @Inject(EdgeDITokens.CreateEdgeUseCase)
    private readonly service: CreateEdgeUseCase,
  ) {}

  public async execute({ request }: CreateEdgeCommand): Promise<Edge> {
    const createEdgeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Edge>) => results.value,
    )(createEdgeResults)
  }
}
