import { buildComponents } from './renderer-components'
import { IGraphData, buildComponentsGraph } from './renderer-graph-components'
import { NodeI } from '@codelab/shared/interface/node'

export class Renderer {
  static components<P>(data: NodeI) {
    return buildComponents<P>(data)
  }

  static graphComponents<P>(data: IGraphData) {
    return buildComponentsGraph<P>(data)
  }
}
