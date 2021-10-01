import { Graph } from '@codelab/shared/abstract/core'
import { TreeService } from '@codelab/shared/core'
import { FactoryProvider } from '@nestjs/common'
import { TreeTokens } from './tree.tokens'

export interface TreeProvider {
  (graph: Graph<any, any>, extractEdgeId?: (edge: any) => string): TreeService<
    any,
    any
  >
}

export const treeProvider: FactoryProvider = {
  provide: TreeTokens.Service,
  useFactory: () => {
    return (graph: Graph<any, any>, extractEdgeId?: (edge: any) => string) =>
      new TreeService(graph, extractEdgeId)
  },
}
