import { DgraphEntityType } from '../../dgraph-entity-type'

export interface DgraphEntity<
  TType extends Array<DgraphEntityType> | DgraphEntityType,
> {
  uid: string
  'dgraph.type': TType extends Array<DgraphEntityType> ? TType : [TType]
}
