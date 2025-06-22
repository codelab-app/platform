import type { IRef } from '@codelab/shared-abstract-core'

import { FieldConnector } from '@codelab/frontend-infra-connector'

import { DeleteFieldModal } from './DeleteFieldModal'

export const DeleteFieldModalContainer = ({ id }: IRef) => {
  return (
    <FieldConnector id={id}>
      {(field) => <DeleteFieldModal field={field} />}
    </FieldConnector>
  )
}
