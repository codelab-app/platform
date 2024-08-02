import type { IToggleService } from '@codelab/frontend/abstract/application'
import type {
  CuiComponentsKey,
  ModelActionKey,
} from '@codelab/frontend/abstract/types'
import { atom, useAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import isEqual from 'lodash/isEqual'
import { useCallback, useMemo } from 'react'
import type { IToggleState } from './toggle.state.interface'

export const defaultMapper = <TData, TOutput = TData>(state?: TData): TOutput =>
  state as unknown as TOutput

export const createToggleStateAtom = <TData = undefined>() =>
  atom<IToggleState<TData>>({
    data: undefined,
    isOpen: false,
  })

export interface IAtomFamilyParam {
  action: ModelActionKey
  ui: CuiComponentsKey
}

const toggleAtomFamily = atomFamily(
  (key: IAtomFamilyParam) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    atom<IToggleState<any>>({
      data: undefined,
      isOpen: false,
    }),
  isEqual,
)

export const useToggleState = <TData = undefined, TOutput = TData>(
  key: IAtomFamilyParam,
  mapper: (state: TData) => TOutput = defaultMapper,
): IToggleService<TData, TOutput> => {
  const [toggleState, setToggleState] = useAtom(toggleAtomFamily(key))

  const open = (data?: TData) => {
    setToggleState({ data, isOpen: true })
  }

  const close = () => {
    setToggleState({ data: undefined, isOpen: false })
  }

  return {
    close,
    data: mapper(toggleState.data),
    isOpen: toggleState.isOpen,
    open,
  }
}
