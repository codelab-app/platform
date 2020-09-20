import { NodeTypeLiteral } from '../enums'
import { NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeCreateDto<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> = NodeDtoI<T, P>
