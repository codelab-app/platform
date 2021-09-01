import { DgraphEntityType } from '../../dgraph-entity-type'

export abstract class DgraphEntity<
  TType extends Array<DgraphEntityType> | DgraphEntityType =
    | Array<DgraphEntityType>
    | DgraphEntityType,
> {
  declare uid: string

  declare 'dgraph.type': TType extends Array<DgraphEntityType> ? TType : [TType]
}
