import { Inject, Logger } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import {
  Propagation,
  Transactional,
  runOnTransactionRollback,
} from 'typeorm-transactional-cls-hooked'
import { AssignGraphToPageSuccessEvent } from '../../../../../page/src/core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { PageCreateErrorEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreateErrorEvent'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Graph } from '../../domain/graph'
import { Vertex } from '../../domain/vertex'
import { NodeType } from '@codelab/backend'
import { AssignGraphToPageCommand } from '../commands/AssignGraphToPageCommand'

@CommandHandler(AssignGraphToPageCommand)
export class AssignGraphToPageCommandHandler
  implements ICommandHandler<AssignGraphToPageCommand> {
  private logger: Logger = new Logger('AssignGraphToPageCommandHandler')

  constructor(
    @Inject(GraphDITokens.GraphRepository)
    private readonly graphRepository: GraphRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  @Transactional({ propagation: Propagation.NESTED })
  async execute({ page }: AssignGraphToPageCommand) {
    let graph: Graph

    try {
      graph = await this.graphRepository.addGraphToPage(page)

      const rootVertex = new Vertex({
        type: NodeType.React_Grid_Layout_Container,
        props: {},
      })

      graph.addVertex(rootVertex)
      await this.graphRepository.updateGraph(graph)
      this.eventBus.publish(new AssignGraphToPageSuccessEvent())
    } catch (e) {
      await this.graphRepository.manager?.queryRunner?.rollbackTransaction()
    }
    runOnTransactionRollback(() => {
      this.logger.log('Transaction rollback callback')
      this.eventBus.publish(new PageCreateErrorEvent(page, graph))
    })
  }
}
