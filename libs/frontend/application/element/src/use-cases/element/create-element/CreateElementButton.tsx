import CloseOutlined from '@ant-design/icons/CloseOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IElementService,
  IEntityFormService,
} from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IElementTree,
} from '@codelab/frontend/abstract/domain'
import { elementRef, elementTreeRef } from '@codelab/frontend/abstract/domain'
import { mapElementOption } from '@codelab/frontend/domain/element'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Button } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type CreateElementButtonProps = React.ComponentProps<typeof Button> & {
  activeForm?: IEntityFormService<Ref<IElementModel>> | null
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
