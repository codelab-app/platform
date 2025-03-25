import { UpdatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/update-page'

const UpdatePagePopoverPage = async ({
  params,
}: {
  params: Promise<{ pageId: string; appId: string }>
}) => {
  const { appId, pageId } = await params

  return <UpdatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default UpdatePagePopoverPage
