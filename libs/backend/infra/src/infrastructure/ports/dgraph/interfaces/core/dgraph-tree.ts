import { BaseTree } from '@codelab/shared/abstract/core'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'
import { DgraphNode } from './dgraph-node'

/**
 * Tree is a pointer to a tree of nodes, think of it as a container for nodes.
 */
export abstract class DgraphTree<
    TNode extends DgraphNode<any, any>,
    TType extends DgraphEntityType,
  >
  extends DgraphEntity<[DgraphEntityType.Tree, TType]>
  implements BaseTree<TNode>
{
  declare root: TNode
}
