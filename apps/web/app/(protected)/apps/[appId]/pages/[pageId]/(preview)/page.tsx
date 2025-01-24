import { PagePreviewPageConnector } from './page.connector'

const PagePreviewPage = async ({
  params: { pageId },
}: {
  params: { pageId: string }
}) => {
  return <PagePreviewPageConnector pageId={pageId} />
}

export default PagePreviewPage
