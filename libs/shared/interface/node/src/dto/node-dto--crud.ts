import { NodeTypeLiteral } from '../enums/node-enum'
import { NodeI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeCreate<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> = NodeI<T, P>
