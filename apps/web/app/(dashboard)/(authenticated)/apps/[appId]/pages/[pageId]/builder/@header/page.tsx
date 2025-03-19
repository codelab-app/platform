import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { AppConnector } from '@codelab/frontend/infra/connector'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageConnector,
  PageDetailHeader,
} from '@codelab/frontend-application-page/views'

const Header = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => (
            <PageDetailHeader
              BuilderResizeMenu={<BuilderResizeMenu />}
              app={app}
              page={page}
            />
          )}
        </PageConnector>
      )}
    </AppConnector>
  )
}

Header.displayName = 'Header'

export default Header
