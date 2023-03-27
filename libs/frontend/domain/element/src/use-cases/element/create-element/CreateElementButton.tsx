import { PlusOutlined } from '@ant-design/icons'
import type {
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { elementRef, elementTreeRef } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { mapElementOption } from '../../../utils'

export type CreateElementButtonProps = Pick<IElementService, 'createModal'> &
  React.ComponentProps<typeof Button> & {
    selectedElementId: Maybe<string>
    elementTree: IElementTree
  }

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({ createModal, elementTree, selectedElementId, title, type }) => {
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
            elementOptions: elementTree.elements.map(mapElementOption),
            elementTree: elementTreeRef(elementTree.id),
            selectedElement,
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
