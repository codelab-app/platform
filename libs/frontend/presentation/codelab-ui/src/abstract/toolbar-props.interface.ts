import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import type React from 'react'

export interface ToolbarItem {
  icon: React.ReactNode
  key: ModelActionKey
  label?: string
  title: string
  onClick?(): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
