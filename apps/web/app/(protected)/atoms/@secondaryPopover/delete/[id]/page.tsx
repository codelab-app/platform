import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Atom | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
  const atomDto = await atomRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      atomsDto={atomDto ? [atomDto] : []}
      fallback={<Spinner />}
    >
      <DeleteAtomsModal id={id} />
    </DomainStoreHydrator>
  )
}

export default Page
