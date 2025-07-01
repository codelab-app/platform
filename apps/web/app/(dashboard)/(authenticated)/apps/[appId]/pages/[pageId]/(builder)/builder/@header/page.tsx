import type { PageProps } from '@codelab/frontend-abstract-types'

import { PageBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PageBuilderHeaderContainer appId={appId} pageId={pageId} />
}

Page.displayName = 'Header'

export default Page
