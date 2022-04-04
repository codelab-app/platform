import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Element, elementRef, WithElementService } from '../../../store'

interface DeleteElementProps extends WithElementService {
  element: Element
}

export const DeleteElementButton = observer(
  ({ elementService, element }: DeleteElementProps) => {
    const onClick = () => elementService.deleteModal.open(elementRef(element))

    return (
      <Button danger onClick={onClick}>
        Delete
      </Button>
    )
  },
)
