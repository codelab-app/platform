import EditOutlined from '@ant-design/icons/EditOutlined'
import { resourceRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useUpdateResourceModal } from './update-resource.state'

export type UpdateResourceButtonProps = UpdateButtonProps

export const UpdateResourceButton = observer(
  ({ disabled, id }: UpdateResourceButtonProps) => {
    const updateResourceModal = useUpdateResourceModal()

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => updateResourceModal.open(resourceRef(id).current)}
        size="small"
        type="primary"
      />
    )
  },
)
