import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { WithOwnerId } from './types/with-owner'

export interface DgraphLambda
  extends DgraphEntity<DgraphEntityType.Lambda>,
    WithOwnerId {
  name: string
  body: string
}

export const isDgraphLambda = (
  entity: DgraphEntity<DgraphEntityType>,
): entity is DgraphLambda => {
  return arrayEquals(entity['dgraph.type'], [DgraphEntityType.Lambda])
}
