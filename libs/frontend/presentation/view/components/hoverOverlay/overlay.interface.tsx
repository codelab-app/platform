import type { Nullable } from '@codelab/shared/abstract/types'
import type React from 'react'

export interface OverlayProps {
  content?: React.ReactNode
  nodeId?: string

  getOverlayElement(nodeId: string): Nullable<HTMLElement>
}
