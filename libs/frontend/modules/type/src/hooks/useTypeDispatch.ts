import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { typeSlice } from '../store/typeState'

export const useTypeDispatch = crudModalDispatchFactory(typeSlice.actions)
