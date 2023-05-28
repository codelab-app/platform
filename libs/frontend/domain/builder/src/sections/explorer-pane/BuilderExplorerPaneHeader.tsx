import type {
  IBuilderService,
  IElement,
  IElementService,
  IElementTree,
  IEntityFormService,
  IFieldService,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/domain/element'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface BuilderMainPaneHeaderProps {
  builderService: IBuilderService
  elementService: IElementService
  elementTree: Maybe<IElementTree>
  fieldService: IFieldService
  root: Maybe<IElement>
}

export const BuilderExplorerPaneHeader = observer(
  ({
    builderService,
    elementService,
    elementTree,
    fieldService,
    root,
  }: BuilderMainPaneHeaderProps) => {
    if (!root || !elementTree) {
      return null
    }

    let activeForm: Nullable<IEntityFormService<unknown>> = null

    if (elementService.createForm.isOpen) {
      activeForm = elementService.createForm
    } else if (fieldService.createForm.isOpen) {
      activeForm = fieldService.createForm
    } else if (fieldService.updateForm.isOpen) {
      activeForm = fieldService.updateForm
    }

    return (
      <CreateElementButton
        activeForm={activeForm}
        createElementForm={elementService.createForm}
        elementTree={elementTree}
        key={0}
        selectedElementId={builderService.selectedNode?.id}
        title="Element"
      />
    )
  },
)

BuilderExplorerPaneHeader.displayName = 'BuilderMainPaneHeader'
