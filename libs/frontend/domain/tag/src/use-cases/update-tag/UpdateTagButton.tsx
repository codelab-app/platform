import { EditOutlined } from '@ant-design/icons'
import type { ITagService } from '@codelab/frontend/abstract/core'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const UpdateTagButton = observer<
  {
    tagService: ITagService
  } & UpdateButtonProps
>(({ disabled, id, tagService }) => {
  const onClick = () => {
    if (!id) {
      throw new Error('Tag ID is not valid')
    }

    // openUpdateModal({ updateId: id })
  }

  return (
    <Button
      disabled={disabled}
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
