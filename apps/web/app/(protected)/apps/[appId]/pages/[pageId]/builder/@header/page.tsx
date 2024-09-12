import type { PageContextParams } from '@codelab/frontend/abstract/types'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'

const Header = ({
  params: { appId, pageId },
}: {
  params: PageContextParams
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
