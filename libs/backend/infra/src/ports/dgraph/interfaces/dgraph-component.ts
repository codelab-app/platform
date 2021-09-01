import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { DgraphComponent } from './dgraph-element'

// `DgraphComponent` moved to `dgraph-element.ts` to avoid circular dependencies

export const isDgraphComponent = (
  entity: DgraphEntity,
): entity is DgraphComponent => {
  return arrayEquals(entity['dgraph.type'], [
    DgraphEntityType.Tree,
    DgraphEntityType.Component,
  ])
}
