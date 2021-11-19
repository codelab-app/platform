import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { FieldFragment } from '../graphql/Field.fragment.graphql.gen'

export type FieldState = CRUDModalState<FieldFragment & { typeId?: string }>

const initialState: FieldState = {
  ...initialCrudState,
}

export const fieldSlice = createCrudSlice('field', initialState, {})
