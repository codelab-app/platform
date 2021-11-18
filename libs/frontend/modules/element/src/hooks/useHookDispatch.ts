import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { componentSlice } from '../store'

export const useHookDispatch = crudModalDispatchFactory(componentSlice.actions)
