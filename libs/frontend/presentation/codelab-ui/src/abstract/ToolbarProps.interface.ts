import type React from 'react'

export interface ToolbarItem {
  icon: React.ReactNode
  key: React.Key
  label?: string
  title: string
  onClick(): void
}

export interface ToolbarProps {
  items: Array<ToolbarItem>
  title: string
}
