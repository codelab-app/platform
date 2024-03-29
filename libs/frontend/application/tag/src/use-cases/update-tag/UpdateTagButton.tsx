import EditOutlined from '@ant-design/icons/EditOutlined'
import type { IRef } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const UpdateTagButton = observer<IRef>(({ id }) => {
  const onClick = () => {
    if (!id) {
      throw new Error('Tag ID is not valid')
    }
  }

  return (
    <Button
      ghost
      icon={<EditOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    >
      Update Tag
    </Button>
  )
})
