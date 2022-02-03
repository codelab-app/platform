import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { fieldSlice } from '../store'

export const useFieldDispatch = crudModalDispatchFactory(fieldSlice.actions)
