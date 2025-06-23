'use client'

import type { IActionModel } from '@codelab/frontend-abstract-domain'

import { ActionConnector } from '@codelab/frontend-infra-connector'

import { DeleteActionModal } from './DeleteActionModal'

export const DeleteActionModalContainer = ({ id }: { id: string }) => {
  return (
    <ActionConnector id={id}>
      {(action: IActionModel) => <DeleteActionModal action={action} />}
    </ActionConnector>
  )
}
