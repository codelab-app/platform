'use client'

import type { DependencyList, RefObject } from 'react'

import { useCallback, useEffect } from 'react'

type OnClickHandler = (event: MouseEvent | TouchEvent) => void

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: OnClickHandler,
  deps: DependencyList,
) => {
  // Ensure that the handler won't change each render
  const handlerCb = useCallback(handler, deps)

  useEffect(() => {
    const listener: OnClickHandler = (error) => {
      if (!ref.current || ref.current.contains(error.target as Node)) {
        return
      }

      handlerCb(error)
    }

    document.addEventListener('mousedown', listener, true)
    document.addEventListener('touchstart', listener, true)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handlerCb])
}
