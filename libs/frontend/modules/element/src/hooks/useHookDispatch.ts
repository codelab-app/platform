import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { hookSlice } from '../store'

export const useHookDispatch = crudModalDispatchFactory(hookSlice.actions)
