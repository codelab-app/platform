import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdatePagePopoverContainer } from '@codelab/frontend-application-page/use-cases/update-page'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const UpdatePagePopoverPage = async (props: {
  params: Promise<{ pageId: string; appId: string }>
}) => {
  const params = await props.params
  const { appId, pageId } = params

  return <UpdatePagePopoverContainer appId={appId} pageId={pageId} />
}

export default UpdatePagePopoverPage
