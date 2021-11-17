import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { AtomState } from './types'

export const initialState: AtomState = {
  ...initialCrudState,
}

export const atomSlice = createCrudSlice('atom', initialState, {})
