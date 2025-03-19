import { AppConnector } from '@codelab/frontend-application-app/views'

export const PageListPrimarySidebarContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => (
            <PageBuilderPrimarySidebar app={app} page={page} paneType={type} />
          )}
        </PageConnector>
      )}
    </AppConnector>
  )
}
