import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphEnumTypeValue } from './dgraph-enum-type-value'
import { DgraphType } from './dgraph-type'

export interface DgraphEnumType extends DgraphType<DgraphEntityType.EnumType> {
  allowedValues: Array<DgraphEnumTypeValue>
}

export const isDgraphEnumType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphEnumType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.EnumType,
  ])
}
