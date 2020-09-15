import { NodeDtoI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export abstract class TreeStrategy {
  abstract execute(data: NodeDtoI): any
}
