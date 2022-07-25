import { IElement, IElementService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

type DeleteElementProps = {
  elementService: IElementService
  element: IElement
  disabled: boolean
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ elementService, element, disabled }) => {
    const onClick = () =>
      elementService.deleteModal.open(elementRef(element.id))

    return (
      <Button danger disabled={disabled} onClick={onClick}>
        Delete
      </Button>
    )
  },
)
