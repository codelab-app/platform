import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import React, { CSSProperties } from 'react'

const iconStyle: CSSProperties = {
  width: 'inherit',
  height: 'inherit',
  marginLeft: '1.5rem',
  padding: 0,
  display: 'none',
}

export const UpdateTagIconButton = ({ id }: UpdateButtonProps) => {
  const onClick = () => {
    if (!id) {
      throw new Error('Tag ID is not valid')
    }

    // openUpdateModal({ updateId: id })
  }

  return (
    <Button
      ghost
      icon={<EditOutlined />}
      onClick={onClick}
      size="small"
      style={iconStyle}
      type="primary"
    />
  )
}
