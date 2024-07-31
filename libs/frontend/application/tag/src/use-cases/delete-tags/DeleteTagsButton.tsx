import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useTagService } from '../../services'
import { useDeleteTagsModal } from './delete-tags.state'

export const DeleteTagsButton = observer<{ disabled: boolean }>(
  ({ disabled }) => {
    const tagService = useTagService()
    const deleteTagsModal = useDeleteTagsModal()
    const tags = tagService.checkedTags.map((tag) => tag.current)

    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => deleteTagsModal.open(tags)}
        type="primary"
      >
        Delete Tags
      </Button>
    )
  },
)
