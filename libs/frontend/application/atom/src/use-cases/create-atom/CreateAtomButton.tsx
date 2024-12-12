import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'

export const CreateAtomButton = observer(() => {
  const { createPopover } = useAtomService()
  const router = useRouter()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => createPopover.open(router)}
      type="primary"
    >
      Create
    </Button>
  )
})
