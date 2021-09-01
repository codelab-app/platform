import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { Taggable } from './dgraph-tag'

export interface DgraphHook
  extends DgraphEntity<DgraphEntityType.Hook>,
    Taggable {
  hookType: string
  configJson?: string | null
}

export const isDgraphHook = (entity: DgraphEntity): entity is DgraphHook => {
  return arrayEquals(entity['dgraph.type'], [DgraphEntityType.Hook])
}
