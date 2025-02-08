import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DeleteFieldModal } from './DeleteFieldModal'

export const DeleteFieldModalPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
  const fieldDto = await fieldRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      fieldsDto={fieldDto ? [fieldDto] : []}
    >
      <DeleteFieldModal id={id} />
    </DomainStoreHydrator>
  )
}
