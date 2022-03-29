import React from 'react'
import { commonSidebarItems } from './commonSidebarItems'
import { SidebarNavigationContainer } from './SidebarNavigationContainer'

export const SidebarNavigation = () => {
  return (
    <SidebarNavigationContainer
      fullHeight
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: '100%',
      }}
    >
      {commonSidebarItems}
    </SidebarNavigationContainer>
  )
}
