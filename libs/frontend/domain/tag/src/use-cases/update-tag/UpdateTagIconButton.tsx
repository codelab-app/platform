import { EditOutlined } from '@ant-design/icons'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import type { CSSProperties } from 'react'
import React from 'react'

const iconStyle: CSSProperties = {
  display: 'none',
  height: 'inherit',
  marginLeft: '1.5rem',
  padding: 0,
  width: 'inherit',
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
