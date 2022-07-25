import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { ITagService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

export const UpdateTagButton = observer<
  {
    tagService: ITagService
  } & UpdateButtonProps
>(({ id, disabled, tagService }) => {
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
