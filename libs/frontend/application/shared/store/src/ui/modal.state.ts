import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useToggleState } from './toggle.state'

export const useModalState = <TData>(modelActionKey: ModelActionKey) => {
  const toggleState = useToggleState<TData>(modelActionKey, CuiComponents.Modal)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    // modalState: toggleState.state,
    open: toggleState.open,
  }
}
