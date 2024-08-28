import type { ComponentType, ReactNode } from 'react'
import React from 'react'

export interface ConfigPaneProps {
  ConfigPane: ReactNode
}

export const DashboardTemplateConfigPane = ({
  ConfigPane,
}: ConfigPaneProps) => {
  return <div className="size-full overflow-y-auto bg-white">{ConfigPane}</div>
}
