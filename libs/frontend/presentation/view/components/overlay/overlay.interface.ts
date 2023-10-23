import { DragPosition } from '@codelab/frontend/abstract/domain'
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
  position: DragPosition
  element: HTMLElement
  renderContainer: HTMLElement
}

export interface MarginPaddingOverlayProps {
  element: HTMLElement
  renderContainer: HTMLElement
}
