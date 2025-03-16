import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { AppConnector } from '@codelab/frontend-domain-app/store'

import { CreatePagePopover } from './CreatePagePopover'

export const CreatePagePopoverContainer = ({
  appId,
  pageId,
}: PageContextParams) => {
  return (
    <AppConnector id={appId}>
      {(app) => <CreatePagePopover app={app} pageId={pageId} />}
    </AppConnector>
  )
}
