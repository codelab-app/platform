import { GraphDto } from '../../../../../modules/graph/src/core/domain/graph/GraphDto'
import { buildComponents } from './renderer-components'
import { buildComponentsGraph } from './renderer-graph-components'
import { NodeI } from '@codelab/alpha/shared/interface/node'

export class Renderer {
  static components<P>(data: NodeI) {
    return buildComponents<P>(data)
  }

  static graphComponents<P>(data: GraphDto) {
    return buildComponentsGraph<P>(data)
  }
}
