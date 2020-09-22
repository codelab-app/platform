// eslint-disable-next-line import/no-cycle
import { buildComponents } from './renderer-components'
import { NodeDtoI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export class Renderer {
  static components<P extends Props = {}>(data: NodeDtoI) {
    return buildComponents<P>(data)
  }
}
