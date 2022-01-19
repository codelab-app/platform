import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useAtomDispatch } from '../../hooks'

export const CreateAtomButton = () => {
  const { openCreateModal } = useAtomDispatch()

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
