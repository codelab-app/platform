import { NodeTypeTreeEnum } from '../enums/node-enum--tree'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

/**
 * These are subtype aliases with the `type` generic passed in
 */

// Ref
export type NodeRefDtoI<P extends Props = {}> = NodeDtoI<
  NodeTypeTreeEnum.Ref,
  P
>
export type NodeRefDtoA<P extends Props = {}> = NodeDtoA<
  NodeTypeTreeEnum.Ref,
  P
>
// Tree
export type NodeTreeDtoI<P extends Props = {}> = NodeDtoI<
  NodeTypeTreeEnum.Tree,
  P
>
export type NodeTreeDtoA<P extends Props = {}> = NodeDtoA<
  NodeTypeTreeEnum.Tree,
  P
>
