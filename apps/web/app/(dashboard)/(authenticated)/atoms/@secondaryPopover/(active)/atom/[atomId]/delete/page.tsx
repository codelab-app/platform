import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

export const metadata: Metadata = {
  title: 'Delete Atom | Codelab',
}

const Page = async (props: PageProps<'atomId'>) => {
  const {
    params: { atomId },
  } = await parsePageProps(props)

  const atomDto = await atomRepository.findOne({ id: atomId })

  return (
    <DomainStoreHydrator atomsDto={atomDto ? [atomDto] : []}>
      <DeleteAtomsModal id={atomId} />
    </DomainStoreHydrator>
  )
}

export default Page
