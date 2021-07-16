import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphPage } from './dgraph-page'

export interface DgraphApp extends DgraphEntity<DgraphEntityType.App> {
  name: string
  ownerId: string
  pages?: Array<DgraphPage>
}
