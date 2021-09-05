import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphPage } from './dgraph-page'
import { WithOwner } from './types/with-owner'

export interface DgraphApp
  extends DgraphEntity<DgraphEntityType.App>,
    WithOwner {
  name: string
  pages?: Array<DgraphPage>
}
