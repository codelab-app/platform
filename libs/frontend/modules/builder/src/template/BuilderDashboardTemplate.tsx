import { DashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import React, { PropsWithChildren } from 'react'
import { useBuilderSelectedElement } from '../hooks'

export const BuilderDashboardTemplate = ({
  children,
  MainPane,
  MetaPane,
  Header,
  SidebarNavigation,
  headerHeight,
}: PropsWithChildren<DashboardTemplateProps>) => {
  /**
   * TODO todo to issue title
   *
   * Some description here!
   *
   * labels: feature
   * assignees: webberwang
   * milestone: 3
   */
  const { selectedElementId } = useBuilderSelectedElement()

  return (
    <DashboardTemplate
      Header={Header}
      MainPane={MainPane}
      MetaPane={selectedElementId ? MetaPane : undefined}
      SidebarNavigation={SidebarNavigation}
      contentStyles={{ paddingTop: '3rem' }}
      headerHeight={headerHeight ?? 38}
    >
      {children}
    </DashboardTemplate>
  )
}

BuilderDashboardTemplate.displayName = 'BuilderDashboardTemplate'
