import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageConnector,
  PageDetailHeader,
} from '@codelab/frontend-application-page/views'
import { AppConnector } from '@codelab/frontend-domain-app/store'

const Header = async (props: { params: Promise<PageContextParams> }) => {
  const params = await props.params
  const { appId, pageId } = params

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
