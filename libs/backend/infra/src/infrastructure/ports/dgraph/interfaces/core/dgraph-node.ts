import { BaseNode } from '@codelab/backend/abstract/types'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'

export interface ChildrenOrder {
  'children|order'?: number
}

export abstract class DgraphNode<
    TType extends DgraphEntityType,
    TNodeType extends DgraphNode<TType, TNodeType>,
  >
  extends DgraphEntity<[DgraphEntityType.Node, TType]>
  implements BaseNode<TNodeType & ChildrenOrder>, ChildrenOrder
{
  declare children: Array<TNodeType & ChildrenOrder>

  declare 'children|order'?: number
}
