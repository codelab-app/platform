import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useAtomDispatch } from '../../hooks'
import { CreateAtomButtonProps } from './types'

export const CreateAtomButton = ({ centerIcon }: CreateAtomButtonProps) => {
  const { openCreateModal } = useAtomDispatch()

  return (
    <Button
      type="primary"
      css={centerIcon ? tw`flex justify-center items-center` : undefined}
      icon={<PlusOutlined />}
      onClick={openCreateModal}
    >
      Create
    </Button>
  )
}
