import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageBuilderContainer } from './page.client'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async (props: { params: Promise<PageContextParams> }) => {
  const params = await props.params
  const { pageId } = params

  return <PageBuilderContainer pageId={pageId} />
}

Page.displayName = 'Page'

export default Page
