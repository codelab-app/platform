import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'

export const metadata: Metadata = {
  title: 'Delete Atom | Codelab',
}

const Page = async ({ params }: PageProps<'atomId'>) => {
  const { atomId } = await params
  const atomDto = await atomRepository.findOne({ id: atomId })

  return (
    <DomainStoreHydrator atomsDto={atomDto ? [atomDto] : []}>
      <DeleteAtomsModal id={atomId} />
    </DomainStoreHydrator>
  )
}

export default Page
