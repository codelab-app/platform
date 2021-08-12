import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

export interface DgraphArrayType
  extends DgraphType<DgraphEntityType.ArrayType> {
  itemType: DgraphType<any>
}

export const isDgraphArrayType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphArrayType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.ArrayType,
  ])
}
