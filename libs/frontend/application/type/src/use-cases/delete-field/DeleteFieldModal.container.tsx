import type { IRef } from '@codelab/shared/abstract/core'

import { FieldConnector } from '../../views'
import { DeleteFieldModal } from './DeleteFieldModal'

export const DeleteFieldModalContainer = ({ id }: IRef) => {
  return (
    <FieldConnector id={id}>
      {(field) => <DeleteFieldModal field={field} />}
    </FieldConnector>
  )
}
