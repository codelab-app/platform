import MoreOutlined from '@ant-design/icons/MoreOutlined'
import type { ModelUiKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Tabs, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import type { CuiSidebarToolbarProps } from '../../views'
import { CuiCollapseOrNot, CuiSidebarToolbar } from '../../views'
import { CuiSidebarPopoverContainer } from '../CuiSidebarPopover'
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
  key: ModelUiKey
  label: string
  popover?: ReactNode
  tabs?: Array<CuiSidebarTab>
  toolbar?: CuiSidebarToolbarProps
  views?: Array<CuiSidebarView>
}

export const CuiSidebar = ({
  defaultActiveViewKeys,
  key,
  label,
  popover,
  tabs,
  toolbar,
  views,
}: CuiSidebarProps) => {
  console.log(key)

  const sidebarRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={classNames(styles.cuiSidebar, 'h-full flex flex-col')}
      data-cy={CY_DATA.cuiSidebar(key)}
      ref={sidebarRef}
    >
      {tabs && tabs[0] ? (
        <div className="cuiSidebarAntdTabsWrapper">
          <Tabs defaultActiveKey={tabs[0].key}>
            {tabs.map((tab) => (
              <Tabs.TabPane
                key={tab.key}
                tab={<Tooltip title={tab.label}>{tab.icon}</Tooltip>}
              >
                <CuiCollapseOrNot
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
                <CuiCollapseOrNot
                  defaultActivePanels={defaultActiveViewKeys}
                  panels={views}
                />
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      ) : (
        <>
          <div
            className="
          flex
          h-10
          w-full
          flex-row
          items-center
          justify-between
          border-0
          border-b-2
          border-solid
          border-gray-300
          bg-neutral-100
          "
            data-cy={CY_DATA.cuiSidebarHeader()}
          >
            <Typography className="pl-4">
              {views?.length !== 1 ? label : views[0]?.label}
            </Typography>
            {toolbar && views?.length !== 1 ? (
              <div className="max-w-lg">
                <CuiSidebarToolbar {...toolbar} />
              </div>
            ) : views?.[0] && views[0].toolbar && views.length === 1 ? (
              <div className="max-w-lg">
                <CuiSidebarToolbar {...views[0].toolbar} />
              </div>
            ) : null}
          </div>
          {views && (
            <CuiCollapseOrNot
              defaultActivePanels={defaultActiveViewKeys}
              panels={views}
            />
          )}
        </>
      )}
      {popover && (
        <CuiSidebarPopoverContainer anchorRef={sidebarRef}>
          {popover}
        </CuiSidebarPopoverContainer>
      )}
    </div>
  )
}
