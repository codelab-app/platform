import type { Metadata } from 'next'

import { PagePreviewPageContainer } from './page.client'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const PagePreviewPage = async (props: {
  params: Promise<{ pageId: string }>
}) => {
  const params = await props.params
  const { pageId } = params

  return <PagePreviewPageContainer pageId={pageId} />
}

export default PagePreviewPage
