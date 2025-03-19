import { DeletePageModalContainer } from '@codelab/frontend-application-page/use-cases/delete-page'

const Page = async ({
  params,
}: {
  params: Promise<{ appId: string; pageId: string }>
}) => {
  const { appId, pageId } = await params

  return <DeletePageModalContainer appId={appId} pageId={pageId} />
}

export default Page
