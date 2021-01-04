import { NodeType } from '../enums/node-enum'
import { NodeI } from './node-dto'
import { Props } from '@codelab/alpha/shared/interface/props'

export type NodeCreate<
  T extends NodeType = NodeType,
  P extends Props = {}
> = NodeI<T, P>
