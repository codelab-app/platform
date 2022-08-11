import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { ITagService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { nodeRef } from '../../store'

export const DeleteTagsButton = observer<
  { tagService: ITagService } & Omit<DeleteButtonProps, 'ids'>
>(({ disabled, tagService }) => {
  const ids = tagService.checkedTags.map((c) => c.id)

  return (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() =>
        tagService.deleteManyModal.open(ids.map((id) => nodeRef(id)))
      }
      type="primary"
    >
      Delete Tags
    </Button>
  )
})
