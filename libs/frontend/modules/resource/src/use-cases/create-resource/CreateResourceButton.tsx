import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithResourceService } from '../..'

export const CreateResourceButton = observer(
  ({ resourceService }: WithResourceService) => {
    return (
      <Button
        icon={<PlusOutlined />}
        onClick={() => {
          resourceService.createModal.open()
        }}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
