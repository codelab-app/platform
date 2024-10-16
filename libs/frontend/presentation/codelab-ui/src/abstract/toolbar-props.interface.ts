import type { UiKey } from '@codelab/frontend/abstract/types'
import type { SyntheticEvent } from 'react'

export interface ToolbarItem {
  ariaLabel?: string
  cuiKey: UiKey
  icon: React.ReactNode
  label?: string
  title: string
  onClick?(event: SyntheticEvent): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
