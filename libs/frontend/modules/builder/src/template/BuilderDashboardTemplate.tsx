import { DashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export type BuilderDashboardTemplateProps = DashboardTemplateProps

export const BuilderDashboardTemplate = observer<
  PropsWithChildren<BuilderDashboardTemplateProps>
>(
  ({
    children,
    MainPane,
    MetaPane,
    Header,
    SidebarNavigation,
    headerHeight,
  }) => {
    return (
      <DashboardTemplate
        Header={Header}
        MainPane={MainPane}
        MetaPane={MetaPane}
        SidebarNavigation={SidebarNavigation}
        contentStyles={{ paddingTop: '0rem' }}
        headerHeight={headerHeight ?? 38}
      >
        {children}
      </DashboardTemplate>
    )
  },
)

BuilderDashboardTemplate.displayName = 'BuilderDashboardTemplate'
