import { Role } from '@codelab/shared/abstract/core'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
// import { DgraphApp } from './dgraph-app'
import { DgraphTypeUnion } from './types'

export interface DgraphUser extends DgraphEntity<DgraphEntityType.User> {
  roles: Array<Role>
  apps: Array<{ uid: string }>
  auth0Id: string
  types: Array<DgraphTypeUnion>
  // lambdas: Array<DgraphLambda>
  // tags: Array<DgraphTag>
}
