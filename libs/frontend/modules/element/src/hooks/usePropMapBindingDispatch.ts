import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { propMapBindingActions } from '../store'

export const usePropMapBindingDispatch = crudModalDispatchFactory(
  propMapBindingActions,
)
