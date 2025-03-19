import type { IFieldUpdateRouteContext } from '@codelab/frontend/abstract/application'

import { FieldConnector } from '@codelab/frontend/infra/connector'

import { UpdateFieldPopover } from './UpdateFieldPopover'

export const UpdateFieldPopoverContainer = ({
  context,
  fieldId,
}: {
  context: IFieldUpdateRouteContext
  fieldId: string
}) => {
  return (
    <FieldConnector id={fieldId}>
      {(field) => <UpdateFieldPopover context={context} field={field} />}
    </FieldConnector>
  )
}
