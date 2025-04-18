'use client'

import { PageConnector } from '@codelab/frontend-infra-connector'

import { UpdatePagePopover } from './UpdatePagePopover'

export const UpdatePagePopoverContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
  return (
    <PageConnector id={pageId}>
      {(page) => {
        return <UpdatePagePopover appId={appId} page={page} />
      }}
    </PageConnector>
  )
}

UpdatePagePopoverContainer.displayName = 'UpdatePagePopoverContainer'
