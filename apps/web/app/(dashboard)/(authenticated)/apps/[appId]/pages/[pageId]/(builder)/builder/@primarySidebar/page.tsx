import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Page List | Codelab',
}

/**
 * Page needed here for default purposes
 */
const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PageBuilderPrimarySidebarContainer appId={appId} pageId={pageId} />
}

export default Page
