import { buildComponentsGraph } from './render-components-graph'
import { buildComponents } from './renderer-components'
import { NodeI } from '@codelab/shared/interface/node'

export class Renderer {
  static components<P>(data: NodeI) {
    return buildComponents<P>(data)
  }

  static componentsGraph<P>(data: any) {
    return buildComponentsGraph(data)
  }

  // static
}
