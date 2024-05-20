'use client'

import React from 'react'
import type { PanelProps } from 'react-resizable-panels'
import { Panel } from 'react-resizable-panels'

export const ResizablePanel = (props: PanelProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Panel {...props} />
)
