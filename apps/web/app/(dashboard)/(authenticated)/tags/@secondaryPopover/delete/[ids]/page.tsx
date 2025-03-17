import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteTagsModalContainer } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Tags | Codelab',
}

const Page = async ({
  params,
}: {
  params: Promise<{ ids: Array<string> }>
}) => {
  const { ids } = await params

  return <DeleteTagsModalContainer ids={ids} />
}

export default Page
