'use client'

import type { PropsWithChildren } from 'react'
import React from 'react'
import { PanelGroup } from 'react-resizable-panels'

export const ResizableGroup = ({ children }: PropsWithChildren) => {
  return <PanelGroup direction="horizontal">{children}</PanelGroup>
}
