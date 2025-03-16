import type { IRef } from '@codelab/shared/abstract/core'

import { FieldConnector } from '../../views'
import { UpdateFieldPopover } from './UpdateFieldPopover'

export const UpdateFieldPopoverPageContainer = ({ id }: IRef) => {
  return (
    <FieldConnector id={id}>
      {(field) => <UpdateFieldPopover field={field} />}
    </FieldConnector>
  )
}
