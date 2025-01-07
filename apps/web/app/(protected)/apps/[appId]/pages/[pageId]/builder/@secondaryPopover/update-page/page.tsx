import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdatePagePopover } from '@codelab/frontend-application-page/use-cases/update-page'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const UpdatePagePopoverPage = async ({
  params: { pageId },
}: {
  params: { pageId: string }
}) => {
  const page = await pageRepository.findOne({ id_IN: [pageId] })

  if (!page) {
    return null
  }

  return (
    <DashboardPopover>
      <DomainStoreHydrator fallback={<Spinner />} pagesDto={[page]}>
        <UpdatePagePopover id={pageId} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default UpdatePagePopoverPage
