import { PlusOutlined } from '@ant-design/icons'
import { typeRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { Button } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateFieldButton = observer<{
  interfaceId: string
  useModal?: boolean
}>(({ interfaceId, useModal = true }) => {
  const { fieldService } = useStore()

  const onClick = () => {
    const form = useModal ? fieldService.createModal : fieldService.createForm
    form.open(typeRef(interfaceId) as Ref<InterfaceType>)
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
