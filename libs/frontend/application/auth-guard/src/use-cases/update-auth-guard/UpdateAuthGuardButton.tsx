import EditOutlined from '@ant-design/icons/EditOutlined'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { useUpdateAuthGuardModal } from './update-auth-guard.state'

export const UpdateAuthGuardButton = ({ id }: UpdateButtonProps) => {
  const updateAuthGuardModal = useUpdateAuthGuardModal()

  return (
    <Button
      ghost
      icon={<EditOutlined />}
      onClick={() => updateAuthGuardModal.open(authGuardRef(id))}
      size="small"
      type="primary"
    />
  )
}
