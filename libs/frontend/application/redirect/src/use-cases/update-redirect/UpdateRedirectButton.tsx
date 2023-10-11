import { EditOutlined } from '@ant-design/icons'
import { redirectRef } from '@codelab/frontend/abstract/domain'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const UpdateRedirectButton = observer(
  ({ disabled, id }: UpdateButtonProps) => {
    const { redirectService } = useStore()

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => redirectService.updateForm.open(redirectRef(id))}
        size="small"
        type="primary"
      />
    )
  },
)
