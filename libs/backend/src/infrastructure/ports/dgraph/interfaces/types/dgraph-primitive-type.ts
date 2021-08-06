import { equalsSet } from '../../../../../common'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The base primitive types that other types build on */
export enum PrimitiveKind {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
}

export interface DgraphPrimitiveType
  extends DgraphType<DgraphEntityType.PrimitiveType> {
  primitiveKind: PrimitiveKind
}

export const isDgraphPrimitiveType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphPrimitiveType => {
  return equalsSet(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.PrimitiveType,
  ])
}
