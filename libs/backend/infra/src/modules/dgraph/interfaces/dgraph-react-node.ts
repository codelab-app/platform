import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { WithOwner } from './types/with-owner'

export interface DgraphReactNode
  extends DgraphEntity<DgraphEntityType.ReactNodeType>,
    WithOwner {
  name: string
}
