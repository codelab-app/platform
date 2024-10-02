import type { PropsWithChildren } from 'react'

import { cuiPopoverStore } from '../../layout'
import { CuiContext } from './CuiContext'

/**
 * Temporary placement until migration ends providers should be restored to their position
 */

export const CuiProvider = ({ children }: PropsWithChildren) => {
  return (
    <CuiContext.Provider value={{ popover: cuiPopoverStore }}>
      {children}
    </CuiContext.Provider>
  )
}
