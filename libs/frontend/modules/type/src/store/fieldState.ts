import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { InterfaceTypeFieldEdgeFragment } from '../graphql'

export type FieldState = CRUDModalState<InterfaceTypeFieldEdgeFragment>

const initialState: FieldState = {
  ...initialCrudState,
}

export const fieldSlice = createCrudSlice('field', initialState, {})
