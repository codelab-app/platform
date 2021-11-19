import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import React from 'react'
import { usePageDispatch } from '../../hooks'

export const UpdatePageButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = usePageDispatch()

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => {
        if (!id) {
          throw new Error('Page ID is not valid')
        }

        openUpdateModal({ updateId: id })
      }}
    />
  )
}
