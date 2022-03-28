import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'

export const CreateTagButton = observer<WithTagService>(({ tagService }) => {
  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => tagService.createModal.open()}
      type="primary"
    >
      Create Tag
    </Button>
  )
})
