import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'

const UpdateRedirectPopoverPage = async ({
  params,
}: {
  params: Promise<PageContextParams<{ redirectId: string }>>
}) => {
  const { appId, pageId, redirectId } = await params

  return (
    <UpdateRedirectPopover params={{ appId, pageId }} redirectId={redirectId} />
  )
}

export default UpdateRedirectPopoverPage
