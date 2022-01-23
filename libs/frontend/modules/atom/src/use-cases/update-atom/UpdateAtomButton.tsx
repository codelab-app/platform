import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import React from 'react'
import { useAtomDispatch } from '../../hooks'

export const UpdateAtomButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useAtomDispatch()

  const onClick = () => {
    if (!id) {
      throw new Error('Atom ID is not valid')
    }

    openUpdateModal({ updateId: id })
  }

  return (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    />
  )
}
