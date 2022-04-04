import { DashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import { BuilderService } from '../store'

export interface BuilderDashboardTemplateProps extends DashboardTemplateProps {
  builderService: BuilderService
}

export const BuilderDashboardTemplate = observer(
  ({
    children,
    MainPane,
    MetaPane,
    Header,
    SidebarNavigation,
    headerHeight,
    builderService,
  }: PropsWithChildren<BuilderDashboardTemplateProps>) => {
    return (
      <DashboardTemplate
        Header={Header}
        MainPane={MainPane}
        MetaPane={
          builderService.selectedElement?.maybeCurrent ? MetaPane : undefined
        }
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
