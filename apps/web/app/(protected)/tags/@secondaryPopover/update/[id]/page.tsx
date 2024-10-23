import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateTagContainer from './page.container'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const tagDto = await tagRepository.findOne({ id })

  return (
    <DashboardPopover>
      <DomainStoreHydrator
        fallback={<Spinner />}
        tagsDto={tagDto ? [tagDto] : []}
      >
        <UpdateTagContainer id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
