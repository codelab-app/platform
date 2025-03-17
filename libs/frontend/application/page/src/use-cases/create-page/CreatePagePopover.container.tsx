import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { AppConnector } from '@codelab/frontend-application-app/views'

import { CreatePagePopover } from './CreatePagePopover'

export const CreatePagePopoverContainer = ({
  appId,
  pageId,
}: PageContextParams) => {
  return <CreatePagePopover appId={appId} pageId={pageId} />
}
