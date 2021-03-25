import { buildComponents } from './renderer-components'
import { NodeI } from '@codelab/frontend'

export class Renderer {
  static components<P>(data: NodeI) {
    return buildComponents<P>(data)
  }
}
