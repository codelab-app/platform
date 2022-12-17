import { PlusOutlined } from '@ant-design/icons'
import type { ITagService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateTagButton = observer<{ tagService: ITagService }>(
  ({ tagService }) => {
    return (
      <Button
        icon={<PlusOutlined />}
        onClick={() => tagService.createModal.open()}
        type="primary"
      >
        Create Tag
      </Button>
    )
  },
)
