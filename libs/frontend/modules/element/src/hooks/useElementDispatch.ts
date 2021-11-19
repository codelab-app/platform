import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { elementSlice } from '../store'

export const useElementDispatch = crudModalDispatchFactory(elementSlice.actions)
