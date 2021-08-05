import * as R from 'ramda'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity, DgraphNode } from './core'
import { DgraphAtom } from './dgraph-atom'
import { DgraphComponent } from './dgraph-component'

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
  return R.equals(entity['dgraph.type'], [
    DgraphEntityType.Node,
    DgraphEntityType.Element,
  ])
}
