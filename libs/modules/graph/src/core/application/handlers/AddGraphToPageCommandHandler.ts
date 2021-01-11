import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Graph } from '../../domain/graph'
import { Vertex } from '../../domain/vertex'
import { AddGraphToPageCommand } from '../commands/AddGraphToPageCommand'

@CommandHandler(AddGraphToPageCommand)
export class AddGraphToPageCommandHandler
  implements ICommandHandler<AddGraphToPageCommand> {
  constructor(
    @Inject(GraphDITokens.GraphRepository)
    private readonly graphRepository: GraphRepositoryPort,
  ) {}

  async execute({ page }: AddGraphToPageCommand) {
    const graph: Graph = await this.graphRepository.addGraphToPage(page)

    const rootVertex = new Vertex({
      type: 'React_Grid_Layout_Container',
      props: {},
    })

    graph.addVertex(rootVertex)
    await this.graphRepository.update(graph)
  }
}
