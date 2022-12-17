import type { Maybe } from '@codelab/shared/abstract/types'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

export const useDebouncedState = <T>(
  delay: number,
  initialValue: Maybe<T> = undefined,
): [T, Dispatch<SetStateAction<T>>] => {
  // State and setters for debounced value
  const [value, setValue] = useState<T>(initialValue as T)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue as T)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value or delay changes
    [value, delay],
  )

  return [debouncedValue, setValue]
}
