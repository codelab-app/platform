import { EditOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdateAtomButton = () => {
  const { openUpdateModal, state } = useCRUDModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      type="primary"
      ghost
      icon={<EditOutlined />}
      onClick={() => openUpdateModal(state.updateId)}
    />
  )
}
