import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteResourceModalContainer } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Resource | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteResourceModalContainer id={id} />
}

export default Page
