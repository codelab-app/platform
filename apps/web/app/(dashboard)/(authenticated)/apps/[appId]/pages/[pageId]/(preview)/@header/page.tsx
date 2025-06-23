import type { PageProps } from '@codelab/frontend-abstract-types'

import { PageBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <PageBuilderHeaderContainer appId={appId} pageId={pageId} />
}

export default Page
