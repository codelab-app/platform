import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

import { useDeleteElementModal } from './delete-element.state'

interface DeleteElementProps {
  className?: string
  disabled: boolean
  runtimeElement: IRuntimeElementModel
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ className, disabled, runtimeElement }) => {
    const deleteElementModal = useDeleteElementModal()
    const element = runtimeElement.element.current
    const onClick = () => deleteElementModal.open(element)

    return (
      <Button
        className={className}
        danger
        disabled={disabled}
        onClick={onClick}
      >
        Delete
      </Button>
    )
  },
)
