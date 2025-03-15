import type { IRef } from '@codelab/shared/abstract/core'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import { FieldConnector } from '../../views'
import { UpdateFieldPopover } from './UpdateFieldPopover'
import { UpdateFieldPopoverPageContainer } from './UpdateFieldPopoverContainer'

/**
 * Used by popover so we don't need a server component, can be used by page directly
 */
export const UpdateFieldPopoverPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return <UpdateFieldPopoverPageContainer id={id} />
}
