import type { LayoutProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'

/**
 * Used by popover so we don't need a server component, can be used by page directly
 */
export const UpdateFieldPopoverLayout = async ({
  children,
  params,
}: LayoutProps<'fieldId'>) => {
  const { fieldId } = await params
  const fieldDto = await fieldRepository.findOne({ id_IN: [fieldId] })

  return (
    <DomainStoreHydrator fieldsDto={fieldDto ? [fieldDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}
