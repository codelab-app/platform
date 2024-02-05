import type { ComponentType } from 'react'
import React from 'react'

export interface ConfigPaneProps {
  ConfigPane: ComponentType
}

export const DashboardTemplateConfigPane = ({
  ConfigPane,
}: ConfigPaneProps) => {
  return (
    <div className="size-full overflow-y-auto bg-white">
      <ConfigPane />
    </div>
  )
}
