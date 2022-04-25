import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { DashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export type BuilderDashboardTemplateProps = DashboardTemplateProps &
  WithServices<BUILDER_SERVICE>

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
    builderService,
  }) => {
    return (
      <DashboardTemplate
        Header={Header}
        MainPane={MainPane}
        MetaPane={builderService.selectedElement ? MetaPane : undefined}
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
