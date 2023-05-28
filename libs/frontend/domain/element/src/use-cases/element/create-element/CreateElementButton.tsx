import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IElementService,
  IElementTree,
  IEntityFormService,
} from '@codelab/frontend/abstract/core'
import { elementRef, elementTreeRef } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { mapElementOption } from '../../../utils'

export type CreateElementButtonProps = React.ComponentProps<typeof Button> & {
  activeForm?: IEntityFormService<unknown> | null
  createElementForm: IElementService['createForm']
  selectedElementId: Maybe<string>
  elementTree: IElementTree
}

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({
    activeForm,
    createElementForm,
    elementTree,
    selectedElementId,
    title,
    type,
  }) => {
    const selectedElement = selectedElementId
      ? elementRef(selectedElementId)
      : undefined

    return activeForm ? (
      <Button
        icon={<CloseOutlined data-testid="close-page-element-button" />}
        onClick={() => activeForm.close()}
        size="small"
        style={{ background: 'red', color: 'white' }}
        type={type}
      ></Button>
    ) : (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()

          return createElementForm.open({
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
