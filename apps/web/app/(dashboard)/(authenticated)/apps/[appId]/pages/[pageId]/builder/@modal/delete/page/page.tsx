import { DeletePageModal } from '@codelab/frontend-application-page/use-cases/delete-page'
import { PageConnector } from '@codelab/frontend-application-page/views'

const Page = async ({
  params,
}: {
  params: Promise<{ appId: string; pageId: string }>
}) => {
  const { appId, pageId } = await params

  return (
    <PageConnector id={pageId}>
      {(page) => <DeletePageModal appId={appId} page={page} />}
    </PageConnector>
  )
}

export default Page
