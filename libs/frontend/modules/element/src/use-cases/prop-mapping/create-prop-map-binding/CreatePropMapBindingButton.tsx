import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreatePropMapBindingButton = () => {
  // const { openCreateModal } = usePropMapBindingDispatch()

  return (
    <Button
      icon={<PlusOutlined />}
      // onClick={() => openCreateModal()}
      type="primary"
    >
      Add Map Binding
    </Button>
  )
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
