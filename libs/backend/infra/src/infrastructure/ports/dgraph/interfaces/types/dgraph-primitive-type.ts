import { PrimitiveKind } from '@codelab/shared/abstract/core'
import { arrayEquals } from '@codelab/shared-utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The base primitive types that other types build on */

export interface DgraphPrimitiveType
  extends DgraphType<DgraphEntityType.PrimitiveType> {
  primitiveKind: PrimitiveKind
}

export const isDgraphPrimitiveType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphPrimitiveType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.PrimitiveType,
  ])
}
