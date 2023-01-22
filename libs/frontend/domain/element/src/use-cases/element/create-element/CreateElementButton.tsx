import { PlusOutlined } from '@ant-design/icons'
import type { IElementService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

export type CreateElementButtonProps = {
  parentElementId: string
} & Pick<IElementService, 'createModal'> &
  React.ComponentProps<typeof Button>

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({ parentElementId, createModal, type }) => {
    return (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={() => {
          return createModal.open({
            parentElement: elementRef(parentElementId),
          })
        }}
        size="small"
        type={type}
      />
    )
  },
)
