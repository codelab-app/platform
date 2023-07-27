import type React from 'react'

export interface OverlayProps {
  content?: React.ReactNode
  element: HTMLElement
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}
