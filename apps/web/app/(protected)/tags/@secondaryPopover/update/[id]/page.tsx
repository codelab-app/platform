import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateTagConnector from './page.connector'

export const metadata: Metadata = {
  title: 'Update Tag | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
  const tagDto = await tagRepository.findOne({ id })

  return (
    <DashboardPopover>
      <DomainStoreHydrator
        fallback={<Spinner />}
        tagsDto={tagDto ? [tagDto] : []}
      >
        <UpdateTagConnector id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
