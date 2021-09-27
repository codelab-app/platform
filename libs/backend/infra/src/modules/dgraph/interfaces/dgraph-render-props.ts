import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from './core'
import { WithOwner } from './types/with-owner'

export interface DgraphRenderProps
  extends DgraphEntity<DgraphEntityType.RenderPropsType>,
    WithOwner {
  name: string
}
