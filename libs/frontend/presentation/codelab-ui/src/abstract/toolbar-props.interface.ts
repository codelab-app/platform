import type { UiKey } from '@codelab/frontend/abstract/types'
import type { Key } from 'react'
import type React from 'react'

export interface ToolbarItem {
  ariaLabel?: string
  cuiKey: UiKey
  icon: React.ReactNode
  label?: string
  title: string
  onClick?(): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
