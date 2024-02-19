import EditOutlined from '@ant-design/icons/EditOutlined'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const UpdateAuthGuardButton = observer<UpdateButtonProps>(({ id }) => {
  const { authGuardService } = useStore()

  return (
    <Button
      ghost
      icon={<EditOutlined />}
      onClick={() => authGuardService.updateModal.open(authGuardRef(id))}
      size="small"
      type="primary"
    />
  )
})
