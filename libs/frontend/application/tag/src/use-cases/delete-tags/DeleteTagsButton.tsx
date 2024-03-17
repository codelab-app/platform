import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useStore } from '@codelab/frontend/application/shared/store'
import { tagRef } from '@codelab/frontend/domain/tag'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteTagsButton = observer<{ disabled: boolean }>(
  ({ disabled }) => {
    const { tagService } = useStore()
    const tags = tagService.checkedTags.map((tag) => tagRef(tag.current))

    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => tagService.deleteManyModal.open(tags)}
        type="primary"
      >
        Delete Tags
      </Button>
    )
  },
)
