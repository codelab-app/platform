import { PlusOutlined } from '@ant-design/icons'
import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

export const CreateTagButton = observer<WithServices<TAG_SERVICE>>(
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
