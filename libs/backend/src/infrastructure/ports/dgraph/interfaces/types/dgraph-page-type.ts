import { equalsSet } from '../../../../../common'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The PageType allows selecting a Page in the props form. The value is stored as the pageId */
export type DgraphPageType = DgraphType<DgraphEntityType.PageType>

export const isDgraphPageType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphPageType => {
  return equalsSet(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.PageType,
  ])
}
