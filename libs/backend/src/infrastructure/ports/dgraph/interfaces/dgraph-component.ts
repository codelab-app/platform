import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphTree } from './core'
import { DgraphElement } from './dgraph-element'

/**
 * We store the Component in dgraph as a Tree object, we just use the type Component
 * so we can recognize if a particular Tree is a Page, Component or something else
 */
export type DgraphComponent = DgraphTree<
  DgraphElement,
  DgraphEntityType.Component
>
