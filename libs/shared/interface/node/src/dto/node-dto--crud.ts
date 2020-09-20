import { NodeType } from '../enums/node-enum'
import { NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeCreateDto<
  T extends NodeType = NodeType,
  P extends Props = {}
> = NodeDtoI<T, P>
