import type React from 'react'

export interface OverlayProps {
  content?: React.ReactNode
  dependencies: Array<unknown>
  element: HTMLElement
  renderContainer: HTMLElement
}
