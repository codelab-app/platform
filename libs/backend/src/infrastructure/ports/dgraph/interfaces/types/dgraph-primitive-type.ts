import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

export interface DgraphPrimitiveType
  extends DgraphType<DgraphEntityType.PrimitiveType> {
  primitiveKind: string
}
