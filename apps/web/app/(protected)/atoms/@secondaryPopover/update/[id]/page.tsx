import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateAtomContainer from './page.container'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const atomDto = await atomRepository.findOne({ id })

  return (
    <DashboardPopover>
      <DomainStoreHydrator
        atomsDto={atomDto ? [atomDto] : []}
        fallback={<Spinner />}
      >
        <UpdateAtomContainer id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
