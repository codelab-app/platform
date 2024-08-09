import type { UiKey } from '@codelab/frontend/abstract/types'
import { defaultMapper, useToggleState } from '../family-toggle/toggle.state'

export const useModalState = <TData = undefined, TOutput = TData>(
  key: UiKey,
  mapper: (state: TData) => TOutput = defaultMapper,
) => {
  /**
   * Object is created inside hook, which is new and will trigger re-render
   */
  const toggleState = useToggleState<TData, TOutput>(key, mapper)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open: toggleState.open,
  }
}
