import type { Metadata } from 'next'

import { PagePreviewPageConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const PagePreviewPage = async (props: {
  params: Promise<{ pageId: string }>
}) => {
  const params = await props.params
  const { pageId } = params

  return <PagePreviewPageConnector pageId={pageId} />
}

export default PagePreviewPage
