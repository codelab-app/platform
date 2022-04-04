import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Element, elementRef, WithElementService } from '../../../store'

export interface CreatePropMapBindingButtonProps extends WithElementService {
  element: Element
}

export const CreatePropMapBindingButton =
  observer<CreatePropMapBindingButtonProps>(({ elementService, element }) => {
    return (
      <Button
        icon={<PlusOutlined />}
        onClick={() =>
          elementService.createPropMapBindingModal.open(elementRef(element))
        }
        type="primary"
      >
        Add Map Binding
      </Button>
    )
  })
