'use client'

import type { PropsWithChildren } from 'react'
import React from 'react'
import { cuiPopoverStore } from '../../layout'
import { CuiContext } from './CuiContext'

export const CuiProvider = ({ children }: PropsWithChildren) => {
  return (
    <CuiContext.Provider value={{ popover: cuiPopoverStore }}>
      {children}
    </CuiContext.Provider>
  )
}
