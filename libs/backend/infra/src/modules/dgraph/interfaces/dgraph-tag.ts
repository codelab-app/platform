import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { DgraphUser } from './dgraph-user'
import { WithOwner } from './types/with-owner'

/**
 * Page & Element use a different structure. Page is a container with meta info that holds the Element root.
 *
 * For tags, we don't require an extra container to hold meta info.
 */
export class DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>
  implements WithOwner
{
  declare name: string

  declare owner: DgraphUser

  declare parent?: DgraphTag

  declare isRoot: boolean
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
