'use client'

import { PageConnector } from '@codelab/frontend/infra/connector'

import { DeletePageModal } from './DeletePageModal'

export const DeletePageModalContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
  return (
    <PageConnector id={pageId}>
      {(page) => <DeletePageModal appId={appId} page={page} />}
    </PageConnector>
  )
}
