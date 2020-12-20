import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph'
import { CreateGraphCommand } from '../commands/CreateGraphCommand'
import { CreateGraphUseCase } from '../useCases/createGraph/CreateGraphUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(CreateGraphCommand)
export class CreateGraphCommandHandler
  implements ICommandHandler<CreateGraphCommand> {
  constructor(
    @Inject(GraphDITokens.CreateGraphUseCase)
    private readonly service: CreateGraphUseCase,
  ) {}

  public async execute({ request }: CreateGraphCommand): Promise<Graph> {
    const createGraphResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(createGraphResults)
  }
}
