import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const CreateAtomButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      type="primary"
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    />
  )
}

export const CreateAtomButtonIcon = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    />
  )
}
