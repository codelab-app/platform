import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef, ElementStore } from '../../../store'

export interface CreateElementButtonProps
  extends Omit<ButtonProps, 'onClick' | 'icon'> {
  elementStore: ElementStore
  parentElementId?: string
}

export const CreateElementButton = observer(
  ({ parentElementId, elementStore }: CreateElementButtonProps) => {
    return (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={() =>
          elementStore.createModal.open({
            parentElement: parentElementId
              ? elementRef(parentElementId)
              : undefined,
          })
        }
      />
    )
  },
)
