import type { IToggleService } from '@codelab/frontend/abstract/application'
import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { defaultMapper, useToggleState } from '../family-toggle/toggle.state'

export const useFormState = <TData = undefined, TOutput = TData>(
  modelActionKey: ModelActionKey,
  mapper: (state: TData | undefined) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const key = {
    action: modelActionKey,
    ui: CuiComponents.Form,
  }

  const toggleState = useToggleState<TData, TOutput>(key)

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open: toggleState.open,
  }
}
