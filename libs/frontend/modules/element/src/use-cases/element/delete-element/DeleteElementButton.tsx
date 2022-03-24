import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Element, elementRef, ElementService } from '../../../store'

interface DeleteElementProps {
  element: Element
  elementService: ElementService
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
