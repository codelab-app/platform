import { DeleteOutlined } from '@ant-design/icons'
import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

export const DeleteTagsButton = observer<
  WithServices<TAG_SERVICE> & DeleteButtonProps
>(({ disabled, ids, tagService }) => {
  return (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => tagService.deleteCheckedTags()}
      type="primary"
    >
      Delete Tags
    </Button>
  )
})
