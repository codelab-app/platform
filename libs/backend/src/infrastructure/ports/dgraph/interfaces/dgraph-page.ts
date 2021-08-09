import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

export type DgraphPage = DgraphTree<DgraphElement, DgraphEntityType.Page>

export const isDgraphPage = (entity: DgraphEntity): entity is DgraphPage => {
  return equalsSet(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Page,
  ])
}
