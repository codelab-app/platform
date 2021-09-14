import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode, DgraphTree } from './core'
import { DgraphAtom } from './dgraph-atom'
import { DgraphHook } from './dgraph-hook'
import { DgraphPropMapBinding } from './dgraph-prop-map-binding'

export interface DgraphElement
  extends DgraphNode<DgraphEntityType.Element, DgraphElement> {
  /**
   * Optional name, we will display the atom/component type as a fallback
   */
  name?: string
  /**
   * Needs to have either component or atom, we may refactor in future to only allow components
   */
  component?: DgraphComponent
  atom?: DgraphAtom
  props?: string
  css?: string
  hooks?: Array<DgraphHook>
  renderForEachPropKey?: string
  renderIfPropKey?: string
  propMapBindings?: Array<DgraphPropMapBinding> | null
}

export const isDgraphElement = (
  entity: DgraphEntity,
): entity is DgraphElement => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Node,
    DgraphEntityType.Element,
  ])
}

/**
 * Moved here to avoid circular dependency
 *
 * We store the Component in dgraph as a Tree object, we just use the type Component
 * so we can recognize if a particular Tree is a Page, Component or something else
 *
 * Could think of Component as the pointer to the root tree. A Component is simply a tree of Elements, and each descendent element could be of type Atom or another Component
 */
export interface DgraphComponent
  extends DgraphTree<DgraphElement, DgraphEntityType.Component> {
  name: string
}
