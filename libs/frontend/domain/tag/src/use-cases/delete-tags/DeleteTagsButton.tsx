import { DeleteOutlined } from '@ant-design/icons'
import { ITagService } from '@codelab/frontend/abstract/core'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tagRef } from '../../store'

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
        tagService.deleteManyModal.open(ids.map((id) => tagRef(id)))
      }
      type="primary"
    >
      Delete Tags
    </Button>
  )
})
