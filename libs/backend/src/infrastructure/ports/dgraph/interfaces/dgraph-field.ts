import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphType } from './types'

export interface DgraphField extends DgraphEntity<DgraphEntityType.Field> {
  type: DgraphType<any>
  key: string
  name: string
  description?: string
}
