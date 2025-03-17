import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const UpdateRedirectPopoverPage = async (props: {
  params: Promise<{ redirectId: string }>
}) => {
  const params = await props.params
  const { redirectId } = params

  return <UpdateRedirectPopover redirectId={redirectId} />
}

export default UpdateRedirectPopoverPage
