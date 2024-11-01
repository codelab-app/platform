import { CreateComponentPopover } from '@codelab/frontend-application-component/use-cases/create-component'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  return (
    <DashboardPopover>
      <CreateComponentPopover />
    </DashboardPopover>
  )
}

export default Page
