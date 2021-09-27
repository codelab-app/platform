import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphPage } from './dgraph-page'
import { WithOwnerId } from './types/with-owner'

export interface DgraphApp
  extends DgraphEntity<DgraphEntityType.App>,
    WithOwnerId {
  name: string
  pages?: Array<DgraphPage>
}
