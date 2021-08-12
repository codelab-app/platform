import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { WithOwner } from './dgraph-user'

export interface DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>,
    WithOwner {
  name: string
}

export const isDgraphTagPage = (entity: DgraphEntity): entity is DgraphTag => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Tag,
  ])
}

export interface Taggable {
  tags: Array<DgraphTag>
}
