import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEnumTypeValue } from './dgraph-enum-type-value'
import { DgraphType } from './dgraph-type'

export interface DgraphEnumType extends DgraphType<DgraphEntityType.EnumType> {
  allowedValues: Array<DgraphEnumTypeValue>
}
