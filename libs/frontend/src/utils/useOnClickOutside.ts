import { RefObject, useEffect } from 'react'

type OnClickHandler = (event: MouseEvent | TouchEvent) => void

export default function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: OnClickHandler,
) {
  useEffect(() => {
    const listener: OnClickHandler = (e) => {
      if (!ref.current || !handler || ref.current.contains(e.target as Node)) {
        return
      }

      handler(e)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
