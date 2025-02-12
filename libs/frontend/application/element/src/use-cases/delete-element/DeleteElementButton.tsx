'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

import { UiKey } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

import { DeleteElementPopconfirm } from './DeleteElementPopconfirm'

interface DeleteElementProps {
  className?: string
  disabled: boolean
  runtimeElement: IRuntimeElementModel
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ className, disabled, runtimeElement }) => {
    const element = runtimeElement.element.current

    return (
      <DeleteElementPopconfirm
        element={element}
        placement="leftBottom"
        uiKey={UiKey.ElementPopconfirmFormDelete}
      >
        <Button className={className} danger disabled={disabled}>
          Delete
        </Button>
      </DeleteElementPopconfirm>
    )
  },
)
