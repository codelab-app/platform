import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { AppConnector } from '@codelab/frontend-application-app/views'

export const CreatePagePopoverContainer = ({
  appId,
  pageId,
}: PageContextParams) => {
  return (
    <AppConnector id={appId}>{(app) => <CreatePagePopover />}</AppConnector>
  )
}
