import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteTypeModal } from '@codelab/frontend-application-type/use-cases/delete-type'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const typeDto = await typeRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      typesDto={typeDto ? [typeDto] : []}
    >
      <DeleteTypeModal id={id} />
    </DomainStoreHydrator>
  )
}

export default Page
