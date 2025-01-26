import type { Metadata } from 'next'

import { PagePreviewPageConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const PagePreviewPage = async ({
  params: { pageId },
}: {
  params: { pageId: string }
}) => {
  return <PagePreviewPageConnector pageId={pageId} />
}

export default PagePreviewPage
