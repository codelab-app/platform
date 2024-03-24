import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Typography } from 'antd'
import popover from 'antd/es/popover'
import classNames from 'classnames'
import type { PropsWithChildren, RefObject } from 'react'
import React, { useRef } from 'react'
import { CuiCollapsePanel, CuiSidebarToolbar } from '../../../views'
import type { CuiSidebarPopoverLayoutProps } from '../../CuiSidebarPopover'
import { CuiSidebarPopoverLayout } from '../../CuiSidebarPopover'
import type { CuiSidebarProps } from '../CuiSidebar'
import styles from './CuiSidebar.module.css'

type CuiSidebarLayoutProps = CuiSidebarPopoverLayoutProps &
  PropsWithChildren<Pick<CuiSidebarProps, 'uiKey'>>

export const CuiSidebarLayout = ({
  children,
  popoverAnchorRef,
  uiKey,
}: CuiSidebarLayoutProps) => {
  return (
    <div
      className={classNames(styles.cuiSidebar, 'h-full flex flex-col')}
      data-cy={CY_DATA.cuiSidebar(uiKey).cyData}
      ref={popoverAnchorRef}
    >
      {children}
    </div>
  )
}
