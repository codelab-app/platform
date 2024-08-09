import type { IToggleService } from '@codelab/frontend/abstract/application'
import { type ModelActionKey } from '@codelab/frontend/abstract/types'
import { defaultMapper, useToggleState } from '../family-toggle/toggle.state'

export const useFormState = <TData = undefined, TOutput = TData>(
  key: ModelActionKey,
  mapper: (state: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const toggleState = useToggleState<TData, TOutput>(
    key,

    mapper,
  )

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open: toggleState.open,
  }
}
