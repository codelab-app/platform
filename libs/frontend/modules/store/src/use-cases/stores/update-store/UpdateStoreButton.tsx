import { EditOutlined } from '@ant-design/icons'
import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef } from '../../../store'

export type UpdateStoreButtonProps = UpdateButtonProps &
  WithServices<STORE_SERVICE>

export const UpdateStoreButton = observer<UpdateStoreButtonProps>(
  ({ id, disabled, storeService }) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => storeService.updateModal.open(storeRef(id))}
      size="small"
      type="primary"
    />
  ),
)
