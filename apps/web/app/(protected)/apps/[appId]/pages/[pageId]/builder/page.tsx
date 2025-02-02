import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async ({ params: { pageId } }: { params: PageContextParams }) => {
  return <PageBuilderConnector pageId={pageId} />
}

Page.displayName = 'Page'

export default Page
