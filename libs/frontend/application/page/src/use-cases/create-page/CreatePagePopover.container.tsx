import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { CreatePagePopover } from './CreatePagePopover'

export const CreatePagePopoverContainer = ({
  appId,
  pageId,
}: PageContextParams) => {
  return <CreatePagePopover appId={appId} pageId={pageId} />
}
