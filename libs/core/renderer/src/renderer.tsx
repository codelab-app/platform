// eslint-disable-next-line import/no-cycle
import { buildComponents } from './renderer-components'
import { NodeI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export class Renderer {
  static components<P extends Props = {}>(data: NodeI) {
    return buildComponents<P>(data)
  }
}
