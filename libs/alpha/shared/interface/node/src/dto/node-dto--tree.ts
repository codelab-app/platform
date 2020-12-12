import { NodeType } from '../enums'
import { NodeA, NodeI } from './node-dto'
import { Props } from '@codelab/alpha/shared/interface/props'

/**
 * These are subtype aliases with the `type` generic passed in
 */

// Ref
export type NodeDtoTreeRefI<P extends Props = {}> = NodeI<NodeType.Ref, P>

export type NodeDtoTreeRefA<P extends Props = {}> = NodeA<NodeType.Ref, P>

// Tree
export type NodeDtoTreeI<P extends Props = {}> = NodeI<NodeType.Tree, P>

export type NodeDtoTreeA<P extends Props = {}> = NodeA<NodeType.Tree, P>
