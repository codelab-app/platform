import { NodeLike } from '../../../../../common'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'

export type ChildrenOrder = { 'children|order'?: number }

export interface DgraphNode<
  TType extends DgraphEntityType,
  TNodeType extends DgraphNode<TType, TNodeType>,
> extends DgraphEntity<[DgraphEntityType.Node, TType]>,
    NodeLike<TNodeType & ChildrenOrder>,
    ChildrenOrder {
  name: string
  children: Array<TNodeType & ChildrenOrder>
}
