import type { IDropPosition } from '@codelab/frontend/abstract/core'
import type React from 'react'

export interface OverlayProps {
  content?: React.ReactNode
  dependencies: Array<unknown>
  element: HTMLElement
  renderContainer: HTMLElement
}

export interface HoverOverlayProps {
  element: HTMLElement
  renderContainer: HTMLElement
}

export interface DragDropOverlayProps {
  dropPosition: IDropPosition
  element: HTMLElement
  renderContainer: HTMLElement
}

export interface MarginPaddingOverlayProps {
  element: HTMLElement
  renderContainer: HTMLElement
}
