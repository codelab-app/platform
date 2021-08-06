import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'

export interface DgraphLambda extends DgraphEntity<DgraphEntityType.Lambda> {
  name: string
  ownerId: string
  body: string
}

export const isDgraphLambda = (
  entity: DgraphEntity<DgraphEntityType>,
): entity is DgraphLambda => {
  return equalsSet(entity['dgraph.type'], [DgraphEntityType.Lambda])
}
