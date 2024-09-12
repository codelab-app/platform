import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { useDeleteAuthGuardModal } from './delete-auth-guard.state'

export type IDeleteAuthGuardButton = DeleteButtonProps

export const DeleteAuthGuardButton = ({
  disabled,
  ids,
}: IDeleteAuthGuardButton) => {
  const deleteAuthGuardModal = useDeleteAuthGuardModal()

  return (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => ids[0] && deleteAuthGuardModal.open(authGuardRef(ids[0]))}
      size="small"
    />
  )
}
