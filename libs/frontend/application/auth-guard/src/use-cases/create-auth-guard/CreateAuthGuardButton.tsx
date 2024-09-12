import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCreateAuthGuardModal } from './create-auth-guard.state'

export const CreateAuthGuardButton = observer(() => {
  const createAuthGuardModal = useCreateAuthGuardModal()

  return (
    <Button
      className="size-full"
      icon={<PlusOutlined />}
      onClick={() => createAuthGuardModal.open()}
      type="primary"
    />
  )
})
