import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode, DgraphTree } from './core'
import { DgraphAtom } from './dgraph-atom'

export interface DgraphElement
  extends DgraphNode<DgraphEntityType.Element, DgraphElement> {
  component?: DgraphComponent
  atom?: DgraphAtom
  props?: string
  css?: string
}

export const isDgraphElement = (
  entity: DgraphEntity,
): entity is DgraphElement => {
  return equalsSet(entity['dgraph.type'], [
    DgraphEntityType.Node,
    DgraphEntityType.Element,
  ])
}

/**
 * Moved here to avoid circular dependency
 *
 * We store the Component in dgraph as a Tree object, we just use the type Component
 * so we can recognize if a particular Tree is a Page, Component or something else
 */
export type DgraphComponent = DgraphTree<
  DgraphElement,
  DgraphEntityType.Component
>
