import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DeleteTagsModalContainer } from './page.container'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const ids = decodeURIComponent(id).split(',')
  const tagDto = await tagRepository.find({ id_IN: ids })

  return (
    <DomainStoreHydrator fallback={<Spinner />} tagsDto={tagDto.items}>
      <DeleteTagsModalContainer ids={ids} />
    </DomainStoreHydrator>
  )
}

export default Page
