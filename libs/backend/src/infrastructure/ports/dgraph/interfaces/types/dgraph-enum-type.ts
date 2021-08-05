import * as R from 'ramda'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEnumTypeValue } from './dgraph-enum-type-value'
import { DgraphType } from './dgraph-type'

export interface DgraphEnumType extends DgraphType<DgraphEntityType.EnumType> {
  allowedValues: Array<DgraphEnumTypeValue>
}

export const isDgraphEnumType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphEnumType => {
  return R.equals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.EnumType,
  ])
}
