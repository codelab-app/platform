import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphTree } from './core'
import { DgraphTag } from './dgraph-tag'
import { WithOwnerId } from './types/with-owner'

/**
 * This is a container that holds tags, it tells us where the root is.
 */
export class DgraphTagTree
  extends DgraphTree<DgraphTag, DgraphEntityType.TagTree>
  implements WithOwnerId
{
  declare ownerId: string
}

export const isDgraphTagTree = (
  entity: DgraphEntity,
): entity is DgraphTagTree => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Tag,
  ])
}
