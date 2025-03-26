import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { UpdatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/update-page'

const UpdatePagePopoverPage = async ({
  params,
}: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <UpdatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default UpdatePagePopoverPage
