import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'

export const CreateAtomButton = observer(() => {
  const { atomPopoverCreate } = useAtomService()
  const router = useRouter()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => atomPopoverCreate.open(router)}
      type="primary"
    >
      Create
    </Button>
  )
})
