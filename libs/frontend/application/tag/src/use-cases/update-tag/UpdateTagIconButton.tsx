'use client'

import type { IRef } from '@codelab/shared-abstract-core'
import type { CSSProperties } from 'react'

import EditOutlined from '@ant-design/icons/EditOutlined'
import { Button } from 'antd'

const iconStyle: CSSProperties = {
  display: 'none',
  height: 'inherit',
  marginLeft: '1.5rem',
  padding: 0,
  width: 'inherit',
}

export const UpdateTagIconButton = ({ id }: IRef) => {
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
