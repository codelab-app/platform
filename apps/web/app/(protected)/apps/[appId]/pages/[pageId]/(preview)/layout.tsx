import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const PagePreviewLayout = ({
  children,
  params: { appId, pageId },
}: {
  children: ReactNode
  params: { appId: string; pageId: string }
}) => {
  return (
    <DashboardTemplate
      Header={
        <PageDetailHeader
          BuilderResizeMenu={<BuilderResizeMenu />}
          appId={appId}
          pageId={pageId}
        />
      }
    >
      {children}
    </DashboardTemplate>
  )
}

export default PagePreviewLayout
