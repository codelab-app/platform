'use client'

import type { IRef } from '@codelab/shared/abstract/core'

import EditOutlined from '@ant-design/icons/EditOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

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
