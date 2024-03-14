import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import type React from 'react'

export interface ToolbarItem {
  cuiKey: ModelActionKey
  icon: React.ReactNode
  label?: string
  title: string
  onClick?(): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
