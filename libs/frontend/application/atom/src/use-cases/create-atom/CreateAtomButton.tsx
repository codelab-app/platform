import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'

import { useAtomService } from '../../services'

export const CreateAtomButton = observer(() => {
  const { atomPopoverCreate } = useAtomService()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => atomPopoverCreate.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
