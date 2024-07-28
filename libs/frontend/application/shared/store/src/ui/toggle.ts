import type { IToggleService } from '@codelab/frontend/abstract/application'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { createToggleStateAtom } from './toggle.state'

export const useToggleState = <
  TData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
>(): IToggleService<TData, TOutput> => {
  const toggleStateAtom = useMemo(() => createToggleStateAtom<TData>(), [])
  const [toggleState, setToggleState] = useAtom(toggleStateAtom)

  const open = (data?: TData) => {
    setToggleState({ data, isOpen: true })
  }

  const close = () => {
    setToggleState({ data: undefined, isOpen: false })
  }

  return {
    close,
    data: toggleState.data,
    isOpen: toggleState.isOpen,
    open,
  }
}
