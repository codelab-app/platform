import { arrayEquals } from '@codelab/shared/utils'
import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId */
export type DgraphLambdaType = DgraphType<DgraphEntityType.LambdaType>

export const isDgraphLambdaType = (
  type: DgraphType<DgraphEntityType>,
): type is DgraphLambdaType => {
  return arrayEquals(type['dgraph.type'], [
    DgraphEntityType.Type,
    DgraphEntityType.LambdaType,
  ])
}
