import type { ComponentType } from 'react'
import React from 'react'
import tw from 'twin.macro'

export interface ConfigPaneProps {
  ConfigPane: ComponentType
}

export const DashboardTemplateConfigPane = ({
  ConfigPane,
}: ConfigPaneProps) => {
  return (
    <div css={tw`bg-white w-full h-full overflow-y-auto`}>
      <ConfigPane />
    </div>
  )
}

DashboardTemplateConfigPane.displayName = 'DashboardTemplateMetaPane'
