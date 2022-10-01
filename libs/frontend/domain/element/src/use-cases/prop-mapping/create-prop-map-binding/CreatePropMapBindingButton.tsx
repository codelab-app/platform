import { PlusOutlined } from '@ant-design/icons'
import { IElement, IElementService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

export interface CreatePropMapBindingButtonProps {
  element: IElement
  elementService: IElementService
}

export const CreatePropMapBindingButton =
  observer<CreatePropMapBindingButtonProps>(({ elementService, element }) => {
    return (
      <Button
        icon={<PlusOutlined />}
        onClick={() =>
          elementService.createPropMapBindingModal.open(elementRef(element.id))
        }
        type="primary"
      >
        Add Map Binding
      </Button>
    )
  })
