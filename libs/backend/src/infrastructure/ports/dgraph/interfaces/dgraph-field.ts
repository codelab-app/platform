import { equalsSet } from '../../../../common'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphType } from './types'

export interface DgraphField extends DgraphEntity<DgraphEntityType.Field> {
  type: DgraphType<DgraphEntityType>
  key: string
  name?: string
  description?: string
}

export const isDgraphFieldType = (
  entity: DgraphEntity<DgraphEntityType.Field>,
): entity is DgraphField => {
  return equalsSet(entity['dgraph.type'], [DgraphEntityType.Field])
}
