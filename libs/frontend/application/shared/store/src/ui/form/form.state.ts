import type { IToggleService } from '@codelab/frontend/abstract/application'
import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { useMemo } from 'react'
import { defaultMapper, useToggleState } from '../family-toggle/toggle.state'

export const useFormState = <TData = undefined, TOutput = TData>(
  modelActionKey: ModelActionKey,
  mapper: (state: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const toggleState = useToggleState<TData, TOutput>(
    {
      action: modelActionKey,
      ui: CuiComponents.Form,
    },
    mapper,
  )

  return {
    close: toggleState.close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open: toggleState.open,
  }
}
