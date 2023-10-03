import { DeleteOutlined } from '@ant-design/icons'
import type { ITagService } from '@codelab/frontend/abstract/domain'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { tagRef } from '@codelab/frontend/domain/tag'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteTagsButton = observer<
  Omit<DeleteButtonProps, 'ids'> & { tagService: ITagService }
>(({ disabled, tagService }) => {
  const ids = tagService.checkedTags.map((tag) => tag.id)

  return (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() =>
        tagService.deleteManyModal.open(ids.map((id) => tagRef(id)))
      }
      type="primary"
    >
      Delete Tags
    </Button>
  )
})
