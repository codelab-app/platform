import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useToggleState } from './toggle.state'

export const useModalState = <T>(modelActionKey: ModelActionKey) => {
  const toggleState = useToggleState<T>(modelActionKey, CuiComponents.Modal)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    modalState: toggleState.state,
    open: toggleState.open,
  }
}
