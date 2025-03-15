import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeleteTagsModalContainer } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Delete Tags | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
  const ids = decodeURIComponent(id).split(',')
  const tagDto = await tagRepository.find({ id_IN: ids })

  return (
    <DomainStoreHydrator fallback={<Spinner />} tagsDto={tagDto.items}>
      <DeleteTagsModalContainer ids={ids} />
    </DomainStoreHydrator>
  )
}

export default Page
