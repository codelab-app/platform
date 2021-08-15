import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode, DgraphTree } from './core'
import { WithOwner } from './dgraph-user'

/**
 * This is a container that holds tags, it tells us where the root is.
 */
export class DgraphTagTree
  extends DgraphTree<DgraphTag, DgraphEntityType.TagTree>
  implements WithOwner
{
  declare ownerId: string
}

export class DgraphTag
  extends DgraphNode<DgraphEntityType.Tag, DgraphTag>
  implements WithOwner
{
  declare name: string

  declare ownerId: string
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
