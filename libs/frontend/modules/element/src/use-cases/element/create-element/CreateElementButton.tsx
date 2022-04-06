import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef, WithElementService } from '../../../store'

export interface CreateElementButtonProps extends WithElementService {
  parentElementId?: string
}

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({ parentElementId, elementService }) => {
    return (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={() =>
          elementService.createModal.open({
            parentElement: parentElementId
              ? elementRef(parentElementId)
              : undefined,
          })
        }
      />
    )
  },
)
