import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PageState } from './types'

export const intialState: PageState = {
  ...initialCrudState,
}

export const pageSlice = createCrudSlice('page', intialState, {})
