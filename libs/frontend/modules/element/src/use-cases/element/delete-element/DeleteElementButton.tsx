import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

type DeleteElementProps = WithServices<ELEMENT_SERVICE> & {
  element: IElement
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ elementService, element }) => {
    const onClick = () =>
      elementService.deleteModal.open(elementRef(element.id))

    return (
      <Button danger onClick={onClick}>
        Delete
      </Button>
    )
  },
)
