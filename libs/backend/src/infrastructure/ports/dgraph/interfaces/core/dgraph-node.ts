import { NodeLike } from '../../../../../common'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from './dgraph-entity'

export interface DgraphNode<
  TType extends DgraphEntityType,
  TNodeType extends DgraphNode<TType, TNodeType>,
> extends DgraphEntity<[DgraphEntityType.Node, TType]>,
    NodeLike<TNodeType & { 'children|order': number }> {
  name: string
  children: Array<TNodeType & { 'children|order': number }>
  'children|order'?: number
}
