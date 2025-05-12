import type { ReactNode } from 'react'

import { useEffect, useState } from 'react'

export const useSetStateOnRender = (fn: () => ReactNode) => {
  const [value, setValue] = useState<ReactNode>()

  useEffect(() => {
    setValue(fn())
  }, [])

  return value
}
