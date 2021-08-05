import * as R from 'ramda'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

/**
 * We store the Component in dgraph as a Tree object, we just use the type Component
 * so we can recognize if a particular Tree is a Page, Component or something else
 */
export type DgraphComponent = DgraphTree<
  DgraphElement,
  DgraphEntityType.Component
>

export const isDgraphComponent = (
  entity: DgraphEntity,
): entity is DgraphComponent => {
  return R.equals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Component,
  ])
}
