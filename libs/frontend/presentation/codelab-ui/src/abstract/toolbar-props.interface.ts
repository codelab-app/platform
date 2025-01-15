import type { UiKey } from '@codelab/frontend/abstract/types'

export interface ToolbarItem {
  ariaLabel?: string
  confirmText?: string
  cuiKey: UiKey
  icon: React.ReactNode
  label?: string
  title?: string
  onClick?(event: unknown): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
