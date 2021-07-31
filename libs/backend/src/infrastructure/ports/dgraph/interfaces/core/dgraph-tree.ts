import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'
import { DgraphNode } from './dgraph-node'

export interface DgraphTree<
  TNode extends DgraphNode<any, any>,
  TType extends DgraphEntityType,
> extends DgraphEntity<[DgraphEntityType.Tree, TType]> {
  name: string
  root: TNode
}
