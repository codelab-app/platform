import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { componentSlice } from '../store'

export const useComponentDispatch = crudModalDispatchFactory(
  componentSlice.actions,
)
