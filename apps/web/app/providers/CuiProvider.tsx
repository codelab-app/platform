'use client'

import {
  CuiContext,
  cuiPopoverStore,
} from '@codelab/frontend/presentation/codelab-ui'
import type { PropsWithChildren } from 'react'
import React from 'react'

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
