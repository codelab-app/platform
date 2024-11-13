import type { UrlQueryParamsPageProps } from '@codelab/frontend/abstract/types'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateAtomContainer from './page.container'

const Page = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string }
  searchParams: UrlQueryParamsPageProps
}) => {
  const atomDto = await atomRepository.findOne({ id })
  const atomsDto = atomDto ? [atomDto] : []
  const tagsDto = atomDto?.tags

  return (
    <DashboardPopover>
      <ApplicationStoreHydrator
        fallback={<Spinner />}
        queryParams={searchParams}
      >
        <DomainStoreHydrator
          atomsDto={atomsDto}
          fallback={<Spinner />}
          tagsDto={tagsDto}
        >
          <UpdateAtomContainer id={id} />
        </DomainStoreHydrator>
      </ApplicationStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
