import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageListPrimarySidebarContainer } from '@codelab/frontend-application-page/use-cases/page-list'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <PageListPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page
