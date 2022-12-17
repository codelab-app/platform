import type { Nullable } from '@codelab/shared/abstract/types'
import type React from 'react'

export interface OverlayProps {
  nodeId?: string
  content?: React.ReactNode
  getOverlayElement: (nodeId: string) => Nullable<HTMLElement>
}
