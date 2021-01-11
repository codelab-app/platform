import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph/graph'
import { AddChildNodeCommand } from '../commands/AddChildNodeCommand'
import { AddChildNodeUseCase } from '../useCases/addChildNode/AddChildNodeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(AddChildNodeCommand)
export class AddChildNodeCommandHandler
  implements ICommandHandler<AddChildNodeCommand> {
  constructor(
    @Inject(GraphDITokens.AddChildNodeUseCase)
    private readonly service: AddChildNodeUseCase,
  ) {}

  public async execute({ request }: AddChildNodeCommand): Promise<Graph> {
    const addChildNodeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(addChildNodeResults)
  }
}
