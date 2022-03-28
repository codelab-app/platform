import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'

export const DeleteTagsButton = observer<WithTagService & DeleteButtonProps>(
  ({ disabled, ids, tagService }) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => null}
        type="primary"
      >
        Delete Tags
      </Button>
    )
  },
)
