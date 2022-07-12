import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

type DeleteElementProps = WithServices<ELEMENT_SERVICE> & {
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
