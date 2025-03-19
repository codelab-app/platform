import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'

const UpdateRedirectPopoverPage = async ({
  params,
}: {
  params: Promise<{ redirectId: string }>
}) => {
  const { redirectId } = await params

  return <UpdateRedirectPopover redirectId={redirectId} />
}

export default UpdateRedirectPopoverPage
