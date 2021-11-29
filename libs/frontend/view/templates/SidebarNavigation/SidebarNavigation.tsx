import React from 'react'
import { commonSidebarItems } from './commonSidebarItems'
import {
  SidebarNavigationContainer,
  SidebarNavigationContainerProps,
} from './SidebarNavigationContainer'

export type SidebarNavigationProps = SidebarNavigationContainerProps

export const SidebarNavigation = (props: SidebarNavigationProps) => {
  return (
    <SidebarNavigationContainer
      fullHeight
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '100%',
        ...(props.style ?? {}),
      }}
      {...props}
    >
      {commonSidebarItems}
    </SidebarNavigationContainer>
  )
}
