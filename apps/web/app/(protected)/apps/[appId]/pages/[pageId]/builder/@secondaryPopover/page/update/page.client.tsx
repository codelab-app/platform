import { UpdatePagePopover } from '@codelab/frontend-application-page/use-cases/update-page'
import { PageConnector } from '@codelab/frontend-application-page/views'

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
