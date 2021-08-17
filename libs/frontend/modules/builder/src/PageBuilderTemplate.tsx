import { TemplateProps } from '@codelab/frontend/abstract/props'
import { EditorProvider } from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import React from 'react'

export const PageBuilderTemplate = (props: TemplateProps) => {
  const { children, Header, MainPane, MetaPane } = props

  return (
    <EditorProvider>
      <DashboardTemplate
        Header={Header}
        MainPane={MainPane}
        MetaPane={MetaPane}
        SidebarNavigation={null}
      >
        {children}
      </DashboardTemplate>
    </EditorProvider>
  )
}
