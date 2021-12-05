import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { lambdaSlice } from '../store'

export const useLambdaDispatch = () =>
  crudModalDispatchFactory(lambdaSlice.actions)()
