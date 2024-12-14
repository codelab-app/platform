import type { UrlQueryParamsPageProps } from '@codelab/frontend/abstract/types'

import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
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
  const tagsDto = atomDto?.tags ?? []

  return (
    <DashboardPopover>
      <UpdateAtomContainer
        atomsDto={atomsDto}
        id={id}
        searchParams={searchParams}
        tagsDto={tagsDto}
      />
    </DashboardPopover>
  )
}

export default Page
