import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PagePreviewContainer } from '@codelab/frontend-application-builder/use-cases/page-preview'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'App Preview | Codelab',
}

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PagePreviewContainer appId={appId} pageId={pageId} />
}

export default Page
