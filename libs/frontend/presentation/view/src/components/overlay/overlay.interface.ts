import React from 'react'

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

export interface MarginPaddingOverlayProps {
  element: HTMLElement
  renderContainer: HTMLElement
}
