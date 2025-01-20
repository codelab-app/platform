import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { PageBuilderConnector } from './page.connector'

const Page = async ({
  params: { appId, pageId },
}: {
  params: PageContextParams
}) => {
  return <PageBuilderConnector pageId={pageId} />
}

Page.displayName = 'Page'

export default Page
