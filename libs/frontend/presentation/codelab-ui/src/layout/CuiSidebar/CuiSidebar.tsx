import { MoreOutlined } from '@ant-design/icons'
import { Tabs, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import React from 'react'
import type { CuiSidebarToolbarProps } from '../../views'
import { CuiSidebarToolbar } from '../../views'
import { CuiCollapse } from '../../views/CuiCollapse'
import styles from './CuiSidebar.module.css'

export interface CuiSidebarView {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: CuiSidebarToolbarProps
}

export interface CuiSidebarTab {
  defaultActiveViewKeys?: Array<string>
  icon: ReactNode
  key: string
  label: string
  views: Array<CuiSidebarView>
}

export interface CuiSidebarProps {
  defaultActiveViewKeys?: Array<string>
  label: string
  tabs?: Array<CuiSidebarTab>
  toolbar?: CuiSidebarToolbarProps
  views?: Array<CuiSidebarView>
}

export const CuiSidebar = ({
  defaultActiveViewKeys,
  label,
  tabs,
  toolbar,
  views,
}: CuiSidebarProps) => {
  return (
    <div
      className={classNames(styles.cuiSidebar, 'h-full flex flex-col')}
      data-cy={`codelabui-sidebar-${label}`}
    >
      {tabs && tabs[0] ? (
        <div className="cuiSidebarAntdTabsWrapper">
          <Tabs defaultActiveKey={tabs[0].key}>
            {tabs.map((tab) => (
              <Tabs.TabPane
                key={tab.key}
                tab={<Tooltip title={tab.label}>{tab.icon}</Tooltip>}
              >
                <CuiCollapse
                  defaultActivePanels={tab.defaultActiveViewKeys}
                  panels={tab.views}
                />
              </Tabs.TabPane>
            ))}
            {views && (
              <Tabs.TabPane
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
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      ) : (
        <>
          <div className="flex h-10 w-full flex-row items-center justify-between">
            <Typography className="pl-4">{label}</Typography>
            {toolbar && (
              <div className="max-w-lg">
                {
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <CuiSidebarToolbar {...toolbar} />
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
