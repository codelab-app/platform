import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { LambdaFragment } from '../graphql/Lambda.fragment.graphql.gen'

export type LambdaState = CRUDModalState<LambdaFragment>

export type OpenDeleteLambdaModalAction =
  OpenDeleteModalActionPayload<LambdaFragment>
export type OpenUpdateLambdaModalAction =
  OpenUpdateModalActionPayload<LambdaFragment>
