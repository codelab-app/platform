import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { PagePreviewContainer } from '@codelab/frontend-application-builder/use-cases/page-preview'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <PagePreviewContainer appId={appId} pageId={pageId} />
}

export default Page
