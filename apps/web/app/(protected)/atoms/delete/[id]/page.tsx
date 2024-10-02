import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DeleteAtomsModalContainer } from './page.container'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const atomDto = await atomRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      atomsDto={atomDto ? [atomDto] : []}
      fallback={<Spinner />}
    >
      <DeleteAtomsModalContainer id={id} />
    </DomainStoreHydrator>
  )
}

export default Page
