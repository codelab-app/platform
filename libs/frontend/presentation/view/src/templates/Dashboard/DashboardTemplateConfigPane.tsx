import React from 'react'

export interface ConfigPaneProps {
  ConfigPane: React.ReactElement
}

export const DashboardTemplateConfigPane = ({
  ConfigPane,
}: ConfigPaneProps) => {
  return <div className="size-full overflow-y-auto bg-white">{ConfigPane}</div>
}
