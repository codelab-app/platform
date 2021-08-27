import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { Taggable } from './dgraph-tag'

export interface DgraphAtom
  extends DgraphEntity<DgraphEntityType.Atom>,
    Taggable {
  name: string
  atomType: string
  // Instead of DgraphInterfaceType for better separation of root entities
  api: string
}
