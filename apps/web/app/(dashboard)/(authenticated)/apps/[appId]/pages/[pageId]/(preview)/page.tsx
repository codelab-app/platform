import type { Metadata } from 'next'

import { PagePreviewContainer } from '@codelab/frontend-application-builder/use-cases/page-preview'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const PagePreviewPage = async (props: {
  params: Promise<{ pageId: string }>
}) => {
  const params = await props.params
  const { pageId } = params

  return <PagePreviewContainer pageId={pageId} />
}

export default PagePreviewPage
