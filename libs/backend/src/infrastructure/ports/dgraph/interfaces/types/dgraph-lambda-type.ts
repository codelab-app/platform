import { DgraphEntityType } from '../../dgraph-entity-type'
import { DgraphType } from './dgraph-type'

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId */
export type DgraphLambdaType = DgraphType<DgraphEntityType.LambdaType>
