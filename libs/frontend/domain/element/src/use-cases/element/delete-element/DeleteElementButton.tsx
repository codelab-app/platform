import type { IElement } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface DeleteElementProps {
  className?: string
  disabled: boolean
  element: IElement
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ className, disabled, element }) => {
    const { elementService } = useStore()

    const onClick = () =>
      elementService.deleteModal.open(elementRef(element.id))

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
