'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { type IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

import { useCreateFieldForm, useCreateFieldModal } from './create-field.state'

export const CreateFieldButton = observer<{
  interfaceType: IInterfaceTypeModel
  useModal?: boolean
}>(({ interfaceType, useModal = true }) => {
  const createFieldModal = useCreateFieldModal()
  const createFieldForm = useCreateFieldForm()

  const onClick = () => {
    const form = useModal ? createFieldModal : createFieldForm

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
