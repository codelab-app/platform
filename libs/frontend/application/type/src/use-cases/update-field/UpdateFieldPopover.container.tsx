'use client'

import type { IFieldUpdateRoute } from '@codelab/frontend/abstract/application'

import { FieldConnector } from '@codelab/frontend/infra/connector'

import { UpdateFieldPopover } from './UpdateFieldPopover'

export const UpdateFieldPopoverContainer = ({
  context,
}: {
  context: IFieldUpdateRoute
}) => {
  return (
    <FieldConnector id={context.params.fieldId}>
      {(field) => <UpdateFieldPopover context={context} field={field} />}
    </FieldConnector>
  )
}
