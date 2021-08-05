import * as R from 'ramda'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

export interface DgraphArrayType
  extends DgraphType<DgraphEntityType.ArrayType> {
  itemType: DgraphType<any>
}

export const isDgraphArrayType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphArrayType => {
  return R.equals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.ArrayType,
  ])
}
