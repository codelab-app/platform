import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import React from 'react'

const Header = ({
  params: { appId, pageId },
}: {
  params: { appId: string; pageId: string }
}) => {
  return (
    <PageDetailHeader
      BuilderResizeMenu={<BuilderResizeMenu />}
      appId={appId}
      pageId={pageId}
    />
  )
}

export default Header
