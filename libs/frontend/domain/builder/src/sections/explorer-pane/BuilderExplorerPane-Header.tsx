import type {
  IBuilderService,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/domain/element'
import type { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface BuilderMainPaneHeaderProps {
  elementService: IElementService
  builderService: IBuilderService
  root: Nullable<IElement>
}

export const BuilderExplorerPaneHeader = observer(
  ({ root, elementService, builderService }: BuilderMainPaneHeaderProps) => {
    if (!root) {
      return null
    }

    return (
      <CreateElementButton
        createModal={elementService.createModal}
        key={0}
        parentElementId={builderService.selectedNode?.id || root.id}
      />
    )
  },
)

BuilderExplorerPaneHeader.displayName = 'BuilderMainPaneHeader'
