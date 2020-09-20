import { NodeTypeTreeEnum } from '../enums/node-enum--tree'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

/**
 * These are subtype aliases with the `type` generic passed in
 */

// Ref
export type NodeDtoTreeRefI<P extends Props = {}> = NodeDtoI<
  NodeTypeTreeEnum.Ref,
  P
>
export type NodeDtoTreeRefA<P extends Props = {}> = NodeDtoA<
  NodeTypeTreeEnum.Ref,
  P
>

// Tree
export type NodeDtoTreeI<P extends Props = {}> = NodeDtoI<
  NodeTypeTreeEnum.Tree,
  P
>
export type NodeDtoTreeA<P extends Props = {}> = NodeDtoA<
  NodeTypeTreeEnum.Tree,
  P
>
