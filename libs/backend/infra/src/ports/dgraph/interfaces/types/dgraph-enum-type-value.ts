import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEntity } from '../core'

export interface DgraphEnumTypeValue
  extends DgraphEntity<DgraphEntityType.EnumTypeValue> {
  name?: string | null
  stringValue: string
}
