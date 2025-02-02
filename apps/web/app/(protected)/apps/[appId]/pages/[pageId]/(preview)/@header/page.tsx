import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'

const Page = async (props: { params: Promise<PageContextParams> }) => {
  const params = await props.params;

  const {
    appId,
    pageId
  } = params;

  return (
    <PageDetailHeader
      BuilderResizeMenu={<BuilderResizeMenu />}
      appId={appId}
      pageId={pageId}
    />
  )
}

export default Page
