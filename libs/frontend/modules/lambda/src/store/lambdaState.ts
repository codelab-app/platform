import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { LambdaState } from './types'

const initialState: LambdaState = {
  ...initialCrudState,
}

export const lambdaSlice = createCrudSlice('lambda', initialState, {})
