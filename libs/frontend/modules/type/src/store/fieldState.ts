import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { FieldFragment } from '../graphql/Field.fragment.graphql.gen'

export type FieldState = CRUDModalState<FieldFragment>

const initialState: FieldState = {
  ...initialCrudState,
}

export const fieldSlice = createCrudSlice('field', initialState, {})
