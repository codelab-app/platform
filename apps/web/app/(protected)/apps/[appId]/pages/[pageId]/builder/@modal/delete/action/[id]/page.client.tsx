'use client'

import type { IActionModel } from '@codelab/frontend/abstract/domain'

import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'
import { ActionConnector } from '@codelab/frontend-application-store/views'
import { observer } from 'mobx-react-lite'

export const DeleteActionModalContainer = observer(({ id }: { id: string }) => {
  return (
    <ActionConnector id={id}>
      {(action: IActionModel) => <DeleteActionModal action={action} />}
    </ActionConnector>
  )
})
