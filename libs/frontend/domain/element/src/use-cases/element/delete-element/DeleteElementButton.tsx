import { IElement, IElementService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

interface DeleteElementProps {
  elementService: IElementService
  element: IElement
  disabled: boolean
  className?: string
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ elementService, element, disabled, className }) => {
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
