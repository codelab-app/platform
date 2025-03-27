import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeletePageModalContainer } from '@codelab/frontend-application-page/use-cases/delete-page'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const {
    params: { appId, pageId },
  } = await parsePageProps(props)

  return <DeletePageModalContainer appId={appId} pageId={pageId} />
}

export default Page
