import Sider from 'antd/lib/layout/Sider'
import type { ComponentType } from 'react'
import React from 'react'
import tw from 'twin.macro'

export interface ExplorerPaneProps {
  ExplorerPane: ComponentType
}

export const DashboardTemplateExplorerPane = ({
  ExplorerPane,
}: ExplorerPaneProps) => {
  return (
    <div css={tw`w-full h-full`}>
      <Sider
        css={tw`w-auto border-r border-gray-200 max-h-full h-full overflow-x-hidden overflow-y-auto overscroll-contain`}
        theme="light"
        width="auto"
      >
        <div css={tw`relative max-h-full h-full flex flex-row`}>
          <div css={tw`h-full flex-1 w-[calc(100% - 1rem)]`}>
            <ExplorerPane />
          </div>
        </div>
      </Sider>
    </div>
  )
}
