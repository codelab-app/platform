import { Collapse, Tabs, Typography } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { SidebarToolbarProps } from '../../views'
import { SidebarToolbar } from '../../views'

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

const overrideAntDCollapseStyles = `
  .ant-collapse {
    border: none !important;
    border-radius: 0 !important;
    background-color: none;
  }

  .ant-collapse-item {
    border-radius: 0 !important;
  }
  
  .ant-collapse-item > .ant-collapse-header {
    padding: 2px 12px;
    align-items: center;
    border-radius: 0;
  }
`

const SidebarViewContent = ({
  content,
  key,
}: Omit<SidebarView, 'label' | 'toolbar'>) => {
  return (
    <div css={tw`flex flex-col h-full overflow-auto`} key={key}>
      <div css={tw`p-2 flex-1 overflow-auto`}>{content}</div>
    </div>
  )
}

const SidebarViewHeader = ({
  label,
  toolbar,
}: Omit<SidebarView, 'content' | 'key'>) => (
  <div css={tw`flex items-center justify-between max-h-20`}>
    <Typography css={tw`truncate`}>{label}</Typography>
    {toolbar && (
      <div css={tw`max-w-lg`}>
        {
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SidebarToolbar {...toolbar} />
        }
      </div>
    )}
  </div>
)

const renderViews = (allViews: Array<SidebarView>) => (
  <div
    css={[
      overrideAntDCollapseStyles,
      tw`w-full h-full overflow-y-auto overflow-x-hidden`,
    ]}
  >
    <Collapse css={tw`w-full h-full flex flex-col`}>
      {allViews.map((view) => (
        <Collapse.Panel
          header={
            <SidebarViewHeader label={view.label} toolbar={view.toolbar} />
          }
          key={view.key}
        >
          <SidebarViewContent content={view.content} key={view.key} />
        </Collapse.Panel>
      ))}
    </Collapse>
  </div>
)

export const Sidebar = ({ label, tabs, toolbar, views }: SidebarProps) => {
  return (
    <div css={tw`h-full flex flex-col`}>
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
      {tabs && tabs[0] ? (
        <Tabs defaultActiveKey={tabs[0].key}>
          {tabs.map((tab) => (
            <TabPane key={tab.key} tab={tab.label}>
              {renderViews(tab.views)}
            </TabPane>
          ))}
          {views && (
            <TabPane key="other" tab="Other Views">
              {renderViews(views)}
            </TabPane>
          )}
        </Tabs>
      ) : (
        views && renderViews(views)
      )}
    </div>
  )
}
