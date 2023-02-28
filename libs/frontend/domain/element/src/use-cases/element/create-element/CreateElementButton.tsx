import { PlusOutlined } from '@ant-design/icons'
import type { IElementService } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef, elementTreeRef } from '../../../store'

export type CreateElementButtonProps = {
  selectedElementId: Maybe<string>
  elementTreeId: string
} & Pick<IElementService, 'createModal'> &
  React.ComponentProps<typeof Button>

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({ selectedElementId, elementTreeId, createModal, type, title }) => {
    const selectedElement = selectedElementId
      ? elementRef(selectedElementId)
      : undefined

    return (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()

          return createModal.open({
            selectedElement,
            elementTree: elementTreeRef(elementTreeId),
          })
        }}
        size="small"
        type={type}
      >
        {title || ''}
      </Button>
    )
  },
)
