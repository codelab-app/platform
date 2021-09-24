import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { DgraphUser } from './dgraph-user'
import { WithOwner, WithOwnerId } from './types/with-owner'

export class DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>
  implements WithOwner
{
  declare name: string

  declare owner: DgraphUser

  declare parent?: DgraphTag
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
