import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import { FieldConnector } from '../../views'
import { UpdateFieldPopover } from './UpdateFieldPopover'

/**
 * Used by popover so we don't need a server component, can be used by page directly
 */
export const UpdateFieldPopoverLayout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const fieldDto = await fieldRepository.findOne({ id_IN: [id] })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      fieldsDto={fieldDto ? [fieldDto] : []}
    >
      {children}
    </DomainStoreHydrator>
  )
}
