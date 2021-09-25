import { Role } from '@codelab/shared/abstract/core'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphTypeUnion } from './types'

export interface DgraphUser extends DgraphEntity<DgraphEntityType.User> {
  roles: Array<Role>
  // Replace DgraphApp so we don't get circular dependency
  apps: Array<DgraphEntity<DgraphEntityType.App>>
  auth0Id: string
  types: Array<DgraphTypeUnion>
  // lambdas: Array<DgraphLambda>
  // tags: Array<DgraphTag>
}
