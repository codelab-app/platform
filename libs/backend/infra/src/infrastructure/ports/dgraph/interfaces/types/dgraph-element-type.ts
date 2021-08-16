import { arrayEquals } from '@codelab/shared-utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The ElementType allows selecting an Element in the props form. The value is stored as the elementId */
export interface DgraphElementType
  extends DgraphType<DgraphEntityType.ElementType> {
  kind: string
}

export const isDgraphElementType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphElementType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.ElementType,
  ])
}
