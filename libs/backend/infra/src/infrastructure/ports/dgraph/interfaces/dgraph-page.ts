import { arrayEquals } from '@codelab/shared-utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

/**
 * A Page is essentially a container for Elements
 */
export interface DgraphPage
  extends DgraphTree<DgraphElement, DgraphEntityType.Page> {
  name: string
}

export const isDgraphPage = (entity: DgraphEntity): entity is DgraphPage => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Page,
  ])
}
