import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'

export interface DgraphLambda extends DgraphEntity<DgraphEntityType.Lambda> {
  name: string
  ownerId: string
  body: string
}
