import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphFilter } from './dgraph-filter'
import { EqFilter } from './eq-filter'

export const DgraphFilters = {
  Eq: <TEntity>(predicate: string, value: string) =>
    new EqFilter(predicate, value),

  Uid: (uid: string) => new DgraphFilter().withFilter(`uid(${uid})`),

  Type: (type: DgraphEntityType) => new EqFilter('dgraph.type', type),
}
