import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface DeleteElementProps {
  className?: string
  disabled: boolean
  element: IElementModel
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ className, disabled, element }) => {
    const { elementService } = useStore()
    const onClick = () => elementService.deleteModal.open(element)

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
