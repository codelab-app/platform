import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeletePageModalContainer } from '@codelab/frontend-application-page/use-cases/delete-page'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <DeletePageModalContainer appId={appId} pageId={pageId} />
}

export default Page
