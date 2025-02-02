import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateRedirectPopover />
    </DashboardPopover>
  )
}

export default Page
