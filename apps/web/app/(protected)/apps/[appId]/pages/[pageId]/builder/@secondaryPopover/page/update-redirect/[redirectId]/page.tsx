import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const UpdateRedirectPopoverPage = ({
  params: { redirectId },
}: {
  params: { redirectId: string }
}) => {
  return (
    <DashboardPopover>
      <UpdateRedirectPopover redirectId={redirectId} />
    </DashboardPopover>
  )
}

export default UpdateRedirectPopoverPage
