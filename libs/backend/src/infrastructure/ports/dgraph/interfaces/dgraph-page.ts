import * as R from 'ramda'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

export type DgraphPage = DgraphTree<DgraphElement, DgraphEntityType.Page>

export const isDgraphPage = <T>(type: any): type is T => {
  return R.equals(type['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Page,
  ])
}
