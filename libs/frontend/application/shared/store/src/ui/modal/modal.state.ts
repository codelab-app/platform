import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { defaultMapper, useToggleState } from '../family-toggle/toggle.state'

export const useModalState = <TData = undefined, TOutput = TData>(
  modelActionKey: ModelActionKey,
  mapper: (state: TData) => TOutput = defaultMapper,
) => {
  const key = {
    action: modelActionKey,
    ui: CuiComponents.Modal,
  }

  const toggleState = useToggleState<TData, TOutput>(key, mapper)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open: toggleState.open,
  }
}
