import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { AppConnector } from '@codelab/frontend/infra/connector'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageConnector,
  PageDetailHeader,
} from '@codelab/frontend-application-page/views'

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const resolvedParams = await params
  const { appId, pageId } = resolvedParams

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

export default Page
