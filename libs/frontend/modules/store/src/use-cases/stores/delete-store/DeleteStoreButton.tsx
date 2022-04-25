import { DeleteOutlined } from '@ant-design/icons'
import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef } from '../../../store'

export type DeleteStoreButton = DeleteButtonProps & WithServices<STORE_SERVICE>

export const DeleteStoreButton = observer<DeleteStoreButton>(
  ({ disabled, ids, storeService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => storeService.deleteModal.open(storeRef(ids[0]))}
      size="small"
    />
  ),
)
