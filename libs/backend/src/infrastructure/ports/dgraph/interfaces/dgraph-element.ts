import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphNode } from './core'
import { DgraphAtom } from './dgraph-atom'
import { DgraphComponent } from './dgraph-component'

export interface DgraphElement
  extends DgraphNode<DgraphEntityType.Element, DgraphElement> {
  component?: DgraphComponent
  atom?: DgraphAtom
  props?: string
  css?: string
}
