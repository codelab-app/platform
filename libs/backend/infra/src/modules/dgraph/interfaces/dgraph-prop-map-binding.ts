import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'

export interface DgraphPropMapBinding
  extends DgraphEntity<DgraphEntityType.PropMapBinding> {
  targetElement?: { uid: string } | null // is DgraphElement, but will cause recursive reference
  sourceKey: string
  targetKey: string
}

export const isDgraphPropMapBinding = (
  entity: DgraphEntity,
): entity is DgraphPropMapBinding => {
  return arrayEquals(entity['dgraph.type'], [DgraphEntityType.PropMapBinding])
}
