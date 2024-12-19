import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeletePageModal } from '@codelab/frontend-application-page/use-cases/delete-page'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const DeletePageModalPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const pageDto = await pageRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      pagesDto={pageDto ? [pageDto] : []}
    >
      <DeletePageModal id={id} />
    </DomainStoreHydrator>
  )
}

export default DeletePageModalPage
