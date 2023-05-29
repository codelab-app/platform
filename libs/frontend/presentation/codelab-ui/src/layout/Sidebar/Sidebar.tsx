import { MoreOutlined } from '@ant-design/icons'
import { Tabs, Tooltip, Typography } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { SidebarToolbarProps } from '../../views'
import { SidebarToolbar } from '../../views'
import { CuiCollapse } from '../../views/CuiCollapse'

export interface SidebarView {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: SidebarToolbarProps
}

export interface SidebarTab {
  defaultActiveViewKeys?: Array<string>
  icon: ReactNode
  key: string
  label: string
  views: Array<SidebarView>
}

export interface SidebarProps {
  defaultActiveViewKeys?: Array<string>
  label: string
  tabs?: Array<SidebarTab>
  toolbar?: SidebarToolbarProps
  views?: Array<SidebarView>
}

const overrideAntdStyles = `
  .cuiSidebarAntdTabsWrapper {
    height: 100%;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs {
    overflow: hidden;
    height: 100%;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav >
  .ant-tabs-nav-wrap >
  .ant-tabs-nav-list >
  .ant-tabs-tab+.ant-tabs-tab {
    margin: 0px 0px 0px 4px;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav >
  .ant-tabs-nav-wrap >
  .ant-tabs-nav-list >
  .ant-tabs-tab >
  .ant-tabs-tab-btn {
    color: #121212;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav >
  .ant-tabs-nav-wrap >
  .ant-tabs-nav-list >
  .ant-tabs-tab >
  .ant-tabs-tab-btn >
  .anticon {
    margin-left: 10px;
    margin-right: 10px;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav >
  .ant-tabs-nav-wrap >
  .ant-tabs-nav-list >
  .ant-tabs-tab-active >
  .ant-tabs-tab-btn {
    color: #000000;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav >
  .ant-tabs-nav-wrap >
  .ant-tabs-nav-list >
  .ant-tabs-ink-bar {
    background: #000000;
  }
  
  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-nav {
    margin: 0;
    height: 30px;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-content-holder {
    overflow: hidden;
    height: 100%;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-content-holder >
  .ant-tabs-content {
    height: 100%;
    overflow: hidden;
  }

  .cuiSidebarAntdTabsWrapper >
  .ant-tabs >
  .ant-tabs-content-holder >
  .ant-tabs-content >
  .ant-tabs-tabpane {
    height: 100%;
  }
`

const { TabPane } = Tabs

export const Sidebar = ({
  defaultActiveViewKeys,
  label,
  tabs,
  toolbar,
  views,
}: SidebarProps) => {
  return (
    <div
      css={[
        overrideAntdStyles,
        tw`
          h-full
          flex
          flex-col
        `,
      ]}
      data-cy={`codelabui-sidebar-${label}`}
    >
      {tabs && tabs[0] ? (
        <div className="cuiSidebarAntdTabsWrapper">
          <Tabs defaultActiveKey={tabs[0].key}>
            {tabs.map((tab) => (
              <TabPane
                key={tab.key}
                tab={<Tooltip title={tab.label}>{tab.icon}</Tooltip>}
              >
                <CuiCollapse
                  defaultActivePanels={tab.defaultActiveViewKeys}
                  panels={tab.views}
                />
              </TabPane>
            ))}
            {views && (
              <TabPane
                key="other"
                tab={
                  <Tooltip title="Other">
                    <MoreOutlined rotate={90} />
                  </Tooltip>
                }
              >
                <CuiCollapse
                  defaultActivePanels={defaultActiveViewKeys}
                  panels={views}
                />
              </TabPane>
            )}
          </Tabs>
        </div>
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
          {views && (
            <CuiCollapse
              defaultActivePanels={defaultActiveViewKeys}
              panels={views}
            />
          )}
        </>
      )}
    </div>
  )
}
