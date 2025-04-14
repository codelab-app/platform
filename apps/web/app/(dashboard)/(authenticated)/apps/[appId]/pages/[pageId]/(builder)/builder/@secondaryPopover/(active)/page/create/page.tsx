import type { PageProps } from '@codelab/frontend/abstract/types'

import { CreatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/create-page'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <CreatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default Page
