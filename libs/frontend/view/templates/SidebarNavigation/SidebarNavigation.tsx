import React from 'react'
import { commonSidebarItems } from './commonSidebarItems'
import { SidebarContainer } from './SidebarNavigationContainer'

export const SidebarNavigation = () => {
  return (
    <SidebarContainer
      fullHeight
      items={commonSidebarItems}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: '100%',
      }}
    />
  )
}
