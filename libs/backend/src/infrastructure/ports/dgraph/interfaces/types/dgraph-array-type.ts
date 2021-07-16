import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

export interface DgraphArrayType
  extends DgraphType<DgraphEntityType.ArrayType> {
  itemType: DgraphType<any>
}
