'use client'

import { useHotjar } from '../src/hooks/useHotjar.hook'

export const HotjarProvider = () => {
  useHotjar()
  return null
}
