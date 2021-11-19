import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { TypeFragment } from '../graphql/Type.fragment.graphql.gen'

export type TypeState = CRUDModalState<TypeFragment>

const initialState: CRUDModalState<TypeFragment> = {
  ...initialCrudState,
}

export const typeSlice = createCrudSlice('type', initialState, {})

export const typeActions = typeSlice.actions
export const typeReducer = typeSlice.reducer
