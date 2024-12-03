import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateTypePopover } from '@codelab/frontend-application-type/use-cases/update-type'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const type = await typeRepository.findOne({ id_IN: [id] })

  if (!type) {
    return null
  }

  return (
    <DashboardPopover>
      <DomainStoreHydrator fallback={<Spinner />} typesDto={[type]}>
        <UpdateTypePopover id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
