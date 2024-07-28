import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useToggleState } from './toggle.state'

export const useModalState = <
  TToggleData = undefined,
  TAdditionalProperties extends Record<string, void> | undefined = undefined,
>(
  modelActionKey: ModelActionKey,
) => {
  const toggleState = useToggleState<TToggleData, TAdditionalProperties>(
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
