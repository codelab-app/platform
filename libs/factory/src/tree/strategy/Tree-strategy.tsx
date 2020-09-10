import { NodeI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export abstract class TreeStrategy {
  abstract execute<P extends Props = {}>(data: NodeI<P>)
}
