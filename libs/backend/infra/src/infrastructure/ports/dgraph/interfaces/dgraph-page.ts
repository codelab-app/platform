import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

export type DgraphPage = DgraphTree<DgraphElement, DgraphEntityType.Page>

export const isDgraphPage = (entity: DgraphEntity): entity is DgraphPage => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Page,
  ])
}
