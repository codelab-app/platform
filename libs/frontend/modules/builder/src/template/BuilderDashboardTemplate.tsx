import { DashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import { useBuilderSelectedElement } from '../hooks'

export const BuilderDashboardTemplate = observer(
  ({
    children,
    MainPane,
    MetaPane,
    Header,
    SidebarNavigation,
    headerHeight,
  }: PropsWithChildren<DashboardTemplateProps>) => {
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
  },
)

BuilderDashboardTemplate.displayName = 'BuilderDashboardTemplate'
