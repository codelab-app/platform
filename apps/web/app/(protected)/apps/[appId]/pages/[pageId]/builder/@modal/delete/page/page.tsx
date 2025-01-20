import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeletePageModal } from '@codelab/frontend-application-page/use-cases/delete-page'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const DeletePageModalPage = async ({
  params: { appId, pageId },
}: {
  params: { appId: string; pageId: string }
}) => {
  const pageDto = await pageRepository.findOne({ id: pageId })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      pagesDto={pageDto ? [pageDto] : []}
    >
      <DeletePageModal appId={appId} pageId={pageId} />
    </DomainStoreHydrator>
  )
}

export default DeletePageModalPage
