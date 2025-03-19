import type { Metadata } from 'next'

import { PagePreviewContainer } from '@codelab/frontend-application-builder/use-cases/page-preview'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const PagePreviewPage = async ({
  params,
}: {
  params: Promise<{ appId: string; pageId: string }>
}) => {
  const { appId, pageId } = await params

  return <PagePreviewContainer appId={appId} pageId={pageId} />
}

export default PagePreviewPage
