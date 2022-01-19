import { Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

export interface OverlayProps {
  nodeId?: string
  content?: React.ReactNode
  getOverlayElement: (nodeId: string) => Nullable<HTMLElement>
}
