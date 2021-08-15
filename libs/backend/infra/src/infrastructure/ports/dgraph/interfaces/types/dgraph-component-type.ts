import { arrayEquals } from '@codelab/shared-utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The ComponentType allows selecting a Component in the props form. The value is stored as the componentId */
export type DgraphComponentType = DgraphType<DgraphEntityType.ComponentType>

export const isDgraphComponentType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphComponentType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.ComponentType,
  ])
}
