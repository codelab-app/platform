import { tracker } from '@codelab/frontend/infra/logger'
import { serverTracker } from '@codelab/frontend/infra/logger/server'
import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = () => {
  serverTracker.useEvent({
    componentName: 'CreateElement@secondaryPopover',
    event: 'Component rendered',
  })

  return (
    <DashboardPopover>
      <CreateElementPopover />
    </DashboardPopover>
  )
}

export default Page
