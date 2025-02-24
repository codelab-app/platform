import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteTypeModal } from '@codelab/frontend-application-type/use-cases/delete-type'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Type | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
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
