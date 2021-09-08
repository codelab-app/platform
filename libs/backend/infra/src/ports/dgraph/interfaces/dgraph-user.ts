import { Role } from '@codelab/shared/abstract/core'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphApp } from './dgraph-app'

export interface DgraphUser extends DgraphEntity<DgraphEntityType.User> {
  roles: Array<Role>
  apps: Array<DgraphApp>
  auth0Id: string
  // lambdas: Array<DgraphLambda>
  // tags: Array<DgraphTag>
}
