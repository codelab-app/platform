import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'
import { DgraphNode } from './dgraph-node'

/**
 * Tree is a pointer to a tree of nodes
 */
export interface DgraphTree<
  TNode extends DgraphNode<any, any>,
  TType extends DgraphEntityType,
> extends DgraphEntity<[DgraphEntityType.Tree, TType]> {
  name: string
  root: TNode
}
