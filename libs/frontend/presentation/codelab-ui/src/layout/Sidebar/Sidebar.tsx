import { Tabs, Typography } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { SidebarToolbarProps } from '../../views'
import { SidebarToolbar } from '../../views'
import { CuiCollapse } from '../../views/CUICollapse'

interface SidebarView {
  content: React.ReactNode
  key: string
  label: string
  toolbar?: SidebarToolbarProps
}

interface SidebarTab {
  icon: ReactNode
  key: string
  label: string
  views: Array<SidebarView>
}

interface SidebarProps {
  label: string
  tabs?: Array<SidebarTab>
  toolbar?: SidebarToolbarProps
  views?: Array<SidebarView>
}

const { TabPane } = Tabs

export const Sidebar = ({ label, tabs, toolbar, views }: SidebarProps) => {
  return (
    <div css={tw`h-full flex flex-col`}>
      {tabs && tabs[0] ? (
        <Tabs defaultActiveKey={tabs[0].key}>
          {tabs.map((tab) => (
            <TabPane key={tab.key} tab={tab.label}>
              <CuiCollapse panels={tab.views} />
            </TabPane>
          ))}
          {views && (
            <TabPane key="other" tab="Other Views">
              <CuiCollapse panels={views} />
            </TabPane>
          )}
        </Tabs>
      ) : (
        <>
          <div css={tw`w-full h-10 flex flex-row justify-between items-center`}>
            <Typography css={tw`pl-4`}>{label}</Typography>
            {toolbar && (
              <div css={tw`max-w-lg`}>
                {
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <SidebarToolbar {...toolbar} />
                }
              </div>
            )}
          </div>
          {views && <CuiCollapse panels={views} />}
        </>
      )}
    </div>
  )
}
