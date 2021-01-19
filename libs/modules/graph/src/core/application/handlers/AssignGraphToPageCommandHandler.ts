import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import {
  Propagation,
  Transactional,
  runOnTransactionRollback,
} from 'typeorm-transactional-cls-hooked'
import { AssignGraphToPageSuccessEvent } from '../../../../../page/src/core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { PageCreateErrorEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreateErrorEvent'
import { Page } from '../../../../../page/src/core/domain/page'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Graph } from '../../domain/graph'
import { SerializedGraphDto } from '../../domain/graph/dto/SerializedGraphDto'
import { Vertex } from '../../domain/vertex'
import { AssignGraphToPageCommand } from '../commands/AssignGraphToPageCommand'
import { NodeType } from '@codelab/backend'

@CommandHandler(AssignGraphToPageCommand)
export class AssignGraphToPageCommandHandler
  implements ICommandHandler<AssignGraphToPageCommand> {
  constructor(
    @Inject(GraphDITokens.GraphRepository)
    private readonly graphRepository: GraphRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  @Transactional({ propagation: Propagation.NESTED })
  async execute({ page }: AssignGraphToPageCommand) {
    let graph: Graph

    try {
      graph = await this.graphRepository.addGraphToPage(
        Page.hydrate(Page, page),
      )

      const rootVertex = new Vertex({
        type: NodeType.React_Grid_Layout_Container,
        props: {},
      })

      graph.addVertex(rootVertex)
      await this.graphRepository.updateGraph(graph)
      this.eventBus.publish(new AssignGraphToPageSuccessEvent(page))
    } catch (e) {
      await this.graphRepository.manager?.queryRunner?.rollbackTransaction()
    }
    runOnTransactionRollback(() => {
      this.eventBus.publish(
        new PageCreateErrorEvent(page, graph?.toPlain() as SerializedGraphDto),
      )
    })
  }
}
