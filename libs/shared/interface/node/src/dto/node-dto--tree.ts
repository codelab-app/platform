import { TreeType } from '../enums/node-enum--tree'
import { NodeA, NodeI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

/**
 * These are subtype aliases with the `type` generic passed in
 */

// Ref
export type NodeDtoTreeRefI<P extends Props = {}> = NodeI<TreeType.Ref, P>

export type NodeDtoTreeRefA<P extends Props = {}> = NodeA<TreeType.Ref, P>

// Tree
export type NodeDtoTreeI<P extends Props = {}> = NodeI<TreeType.Tree, P>

export type NodeDtoTreeA<P extends Props = {}> = NodeA<TreeType.Tree, P>
