import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useTypeDispatch } from '../../../hooks'

export const CreateTypeButton = () => {
  const { openCreateModal } = useTypeDispatch()

  return (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
      type="primary"
    >
      Create
    </Button>
  )
}
