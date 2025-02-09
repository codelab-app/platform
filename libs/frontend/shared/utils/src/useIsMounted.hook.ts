'use client'

import { useEffect, useState } from 'react'

export const useIsMounted = () => {
  const [mounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return mounted
}
