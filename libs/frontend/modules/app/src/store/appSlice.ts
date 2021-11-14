import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { AppState } from './types'

export const initialState: AppState = {
  ...initialCrudState,
}

export const appSlice = createCrudSlice('app', initialState, {})
