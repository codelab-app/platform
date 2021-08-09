import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { WithOwner } from './dgraph-user'

export interface DgraphLambda
  extends DgraphEntity<DgraphEntityType.Lambda>,
    WithOwner {
  name: string
  body: string
}

export const isDgraphLambda = (
  entity: DgraphEntity<DgraphEntityType>,
): entity is DgraphLambda => {
  return equalsSet(entity['dgraph.type'], [DgraphEntityType.Lambda])
}
