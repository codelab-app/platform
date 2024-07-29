import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useToggleState } from '../family-toggle/toggle.state'

export const useModalState = <TData = undefined, TOutput = TData>(
  modelActionKey: ModelActionKey,
) => {
  const toggleState = useToggleState<TData, TOutput>(
    modelActionKey,
    CuiComponents.Modal,
  )

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    // modalState: toggleState.state,
    open: toggleState.open,
  }
}
