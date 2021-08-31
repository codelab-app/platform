import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphField } from '../dgraph-field'
import { DgraphType } from './dgraph-type'

export interface DgraphInterfaceType
  extends DgraphType<DgraphEntityType.InterfaceType> {
  fields: Array<DgraphField>
}

export const isDgraphInterfaceType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphInterfaceType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.InterfaceType,
  ])
}
