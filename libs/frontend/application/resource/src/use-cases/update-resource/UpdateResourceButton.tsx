import EditOutlined from '@ant-design/icons/EditOutlined'
import { resourceRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type UpdateResourceButtonProps = UpdateButtonProps

export const UpdateResourceButton = observer(
  ({ disabled, id }: UpdateResourceButtonProps) => {
    const { resourceService } = useStore()

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => resourceService.updateModal.open(resourceRef(id))}
        size="small"
        type="primary"
      />
    )
  },
)
