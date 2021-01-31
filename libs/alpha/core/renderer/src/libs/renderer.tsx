import { buildComponents } from './renderer-components'
import { NodeI } from '@codelab/alpha/shared/interface/node'

export class Renderer {
  static components<P>(data: NodeI) {
    return buildComponents<P>(data)
  }
}
