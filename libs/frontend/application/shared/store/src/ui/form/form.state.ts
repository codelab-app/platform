import type { IToggleService } from '@codelab/frontend/abstract/application'
import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useToggleState } from '../family-toggle/toggle.state'

export const useFormState = <TData>(
  modelActionKey: ModelActionKey,
): IToggleService<TData> => {
  const toggleState = useToggleState<TData>(modelActionKey, CuiComponents.Form)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    // modalState: toggleState.state,
    open: toggleState.open,
  }
}
