import { CY_DATA } from '@codelab/frontend-application-shared-data'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import React from 'react'
import type { CuiSidebarPopoverLayoutProps } from '../../CuiSidebarPopover'
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
