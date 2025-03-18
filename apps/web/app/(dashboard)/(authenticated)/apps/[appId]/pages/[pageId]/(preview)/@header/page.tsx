import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageConnector,
  PageDetailHeader,
} from '@codelab/frontend-application-page/views'

const Page = async (props: { params: Promise<PageContextParams> }) => {
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

export default Page
