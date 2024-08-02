import type { IToggleState } from '@codelab/frontend/abstract/application'
import {
  CuiComponents,
  type ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import isEqual from 'lodash/isEqual'
import { useCallback, useMemo } from 'react'
import {
  defaultMapper,
  type IAtomFamilyParam,
  useToggleState,
} from '../family-toggle/toggle.state'

export const useModalState = <TData = undefined, TOutput = TData>(
  modelActionKey: ModelActionKey,
  mapper: (state: TData) => TOutput = defaultMapper,
) => {
  /**
   * Object is created inside hook, which is new and will trigger re-render
   */

  const toggleState = useToggleState<TData, TOutput>(
    {
      action: modelActionKey,
      ui: CuiComponents.Modal,
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
