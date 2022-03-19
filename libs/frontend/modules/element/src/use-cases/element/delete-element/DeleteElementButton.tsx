import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementModel, elementRef, ElementStore } from '../../../store'

interface DeleteElementProps {
  element: ElementModel
  elementStore: ElementStore
}

export const DeleteElementButton = observer(
  ({ elementStore, element }: DeleteElementProps) => {
    const onClick = () => elementStore.deleteModal.open(elementRef(element))

    return (
      <Button danger onClick={onClick}>
        Delete
      </Button>
    )
  },
)
