import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { WithOwner } from './dgraph-user'

export interface DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>,
    WithOwner {
  name: string
}

export const isDgraphTagPage = (entity: DgraphEntity): entity is DgraphTag => {
  return equalsSet(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Tag,
  ])
}

export interface Taggable {
  tags: Array<DgraphTag>
}
