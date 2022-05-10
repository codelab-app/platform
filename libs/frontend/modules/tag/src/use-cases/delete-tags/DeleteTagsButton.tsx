import { DeleteOutlined } from '@ant-design/icons'
import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { nodeRef } from '../../store'

export const DeleteTagsButton = observer<
  WithServices<TAG_SERVICE> & Omit<DeleteButtonProps, 'ids'>
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
