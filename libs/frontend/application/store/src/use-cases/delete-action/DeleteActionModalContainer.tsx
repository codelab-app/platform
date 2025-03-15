'use client'

import type { IActionModel } from '@codelab/frontend/abstract/domain'

import { observer } from 'mobx-react-lite'

import { ActionConnector } from '../../views/Action.connector'
import { DeleteActionModal } from './DeleteActionModal'

export const DeleteActionModalContainer = observer(({ id }: { id: string }) => {
  return (
    <ActionConnector id={id}>
      {(action: IActionModel) => <DeleteActionModal action={action} />}
    </ActionConnector>
  )
})
