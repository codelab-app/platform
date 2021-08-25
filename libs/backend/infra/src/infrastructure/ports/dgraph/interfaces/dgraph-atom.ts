import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { Taggable } from './dgraph-tag'
import { DgraphInterfaceType } from './types'

export interface DgraphAtom
  extends DgraphEntity<DgraphEntityType.Atom>,
    Taggable {
  name: string
  atomType: string
  api: DgraphInterfaceType
}
