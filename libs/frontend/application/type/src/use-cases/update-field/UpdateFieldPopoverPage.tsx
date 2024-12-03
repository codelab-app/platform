import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import { UpdateFieldPopover } from './UpdateFieldPopover'

export const UpdateFieldPopoverPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const field = await fieldRepository.findOne({ id_IN: [id] })

  if (!field) {
    return null
  }

  return (
    <DashboardPopover>
      <DomainStoreHydrator fallback={<Spinner />} fieldsDto={[field]}>
        <UpdateFieldPopover id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}
