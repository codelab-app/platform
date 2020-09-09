import { NodeI } from '@codelab/graph'
import { Props } from '@codelab/shared/interface'

export abstract class TreeStrategy {
  abstract execute<P extends Props = {}>(data: NodeI<P>)
}
