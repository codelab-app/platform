import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

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
      <DeleteElementPopconfirm element={element} placement="leftBottom">
        <Button className={className} danger disabled={disabled}>
          Delete
        </Button>
      </DeleteElementPopconfirm>
    )
  },
)
