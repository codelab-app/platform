import { PlusOutlined } from '@ant-design/icons'
import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateFieldButton = observer<{
  interfaceType: IInterfaceTypeModel
  useModal?: boolean
}>(({ interfaceType, useModal = true }) => {
  const { fieldService } = useStore()

  const onClick = () => {
    const form = useModal ? fieldService.createModal : fieldService.createForm

    form.open(interfaceType)
  }

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={onClick}
      size="small"
    >
      Field
    </Button>
  )
})
