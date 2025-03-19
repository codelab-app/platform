import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

const Page = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageListPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page
