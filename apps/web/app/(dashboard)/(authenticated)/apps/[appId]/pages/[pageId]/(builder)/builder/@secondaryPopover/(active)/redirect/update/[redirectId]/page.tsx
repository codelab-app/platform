import type { PageProps } from '@codelab/frontend/abstract/types'

import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'

const UpdateRedirectPopoverPage = async ({
  params,
}: PageProps<'appId' | 'pageId' | 'redirectId'>) => {
  const { appId, pageId, redirectId } = await params

  return (
    <UpdateRedirectPopover params={{ appId, pageId }} redirectId={redirectId} />
  )
}

export default UpdateRedirectPopoverPage
