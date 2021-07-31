import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphInterfaceType } from './types'

export interface DgraphAtom extends DgraphEntity<DgraphEntityType.Atom> {
  name: string
  atomType: string
  api: DgraphInterfaceType
}
