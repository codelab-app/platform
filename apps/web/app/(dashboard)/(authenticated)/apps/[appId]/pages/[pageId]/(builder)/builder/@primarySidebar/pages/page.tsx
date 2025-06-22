import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { PageListPrimarySidebarContainer } from '@codelab/frontend-application-page/use-cases/page-list'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PageListPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page
