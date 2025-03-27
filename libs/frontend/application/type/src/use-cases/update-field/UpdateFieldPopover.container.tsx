'use client'

import type { IFieldUpdateRouteContext } from '@codelab/frontend/abstract/application'

import { FieldConnector } from '@codelab/frontend/infra/connector'

import { UpdateFieldPopover } from './UpdateFieldPopover'

export const UpdateFieldPopoverContainer = ({
  context,
}: {
  context: IFieldUpdateRouteContext
}) => {
  return (
    <FieldConnector id={context.params.fieldId}>
      {(field) => <UpdateFieldPopover context={context} field={field} />}
    </FieldConnector>
  )
}
