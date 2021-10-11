import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

export type DgraphUnionType = DgraphType<DgraphEntityType.UnionType> & {
  typesOfUnionType: Array<any>
}

export const isDgraphUnionType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphUnionType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.UnionType,
  ])
}
