import MoreOutlined from '@ant-design/icons/MoreOutlined'
import { Tabs, Tooltip } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import type { CuiSidebarProps, CuiSidebarView } from '../CuiSidebar'

type CuiSidebarTabsProps = Pick<
  CuiSidebarProps,
  'defaultActiveViewKeys' | 'views'
> & {
  tabs: Array<CuiSidebarTab>
}

export interface CuiSidebarTab {
  defaultActiveViewKeys?: Array<string>
  icon: ReactNode
  key: string
  label: string
  views: Array<CuiSidebarView>
}

/**
 * @deprecated
 */
export const CuiSidebarTabs = ({
  defaultActiveViewKeys,
  tabs,
  views,
}: CuiSidebarTabsProps) => {
  if (!tabs[0]) {
    throw new Error('Must have at least 1 tab')
  }

  return (
    <div className="cuiSidebarAntdTabsWrapper">
      <Tabs defaultActiveKey={tabs[0].key}>
        {tabs.map((tab) => (
          <Tabs.TabPane
            key={tab.key}
            tab={<Tooltip title={tab.label}>{tab.icon}</Tooltip>}
          >
            {/* <CuiCollapseOrNot
              defaultActivePanels={tab.defaultActiveViewKeys}
              items={tab.views}
            /> */}
          </Tabs.TabPane>
        ))}
        <Tabs.TabPane
          key="other"
          tab={
            <Tooltip title="Other">
              <MoreOutlined rotate={90} />
            </Tooltip>
          }
        >
          {/* <CuiCollapseOrNot
              defaultActivePanels={defaultActiveViewKeys}
              items={views}
            /> */}
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
