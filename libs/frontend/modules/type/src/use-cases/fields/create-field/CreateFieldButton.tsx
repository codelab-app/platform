import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useFieldDispatch } from '../../../hooks'

export const CreateFieldButton = () => {
  const { openCreateModal } = useFieldDispatch()

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
