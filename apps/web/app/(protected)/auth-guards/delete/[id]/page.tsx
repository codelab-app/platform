import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteAuthGuardModal } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Auth Guard | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
  const authGuardDto = await authGuardRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      authGuardsDto={authGuardDto ? [authGuardDto] : []}
      fallback={<Spinner />}
    >
      <DeleteAuthGuardModal id={id} />
    </DomainStoreHydrator>
  )
}

export default Page
