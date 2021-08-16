import { arrayEquals } from '@codelab/shared-utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { WithOwner } from './dgraph-user'

export class DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>
  implements WithOwner
{
  declare name: string

  declare ownerId: string
}

export const isDgraphTag = (entity: DgraphEntity): entity is DgraphTag => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Node,
    DgraphEntityType.Tag,
  ])
}

export interface Taggable {
  tags: Array<DgraphTag>
}
