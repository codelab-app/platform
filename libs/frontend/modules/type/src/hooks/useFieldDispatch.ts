import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { fieldSlice } from '../store/fieldState'

export const useFieldDispatch = crudModalDispatchFactory(fieldSlice.actions)
