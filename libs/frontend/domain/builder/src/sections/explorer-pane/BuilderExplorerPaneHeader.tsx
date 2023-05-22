import type {
  IBuilderService,
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/domain/element'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface BuilderMainPaneHeaderProps {
  builderService: IBuilderService
  elementService: IElementService
  elementTree: Maybe<IElementTree>
  root: Maybe<IElement>
}

export const BuilderExplorerPaneHeader = observer(
  ({
    builderService,
    elementService,
    elementTree,
    root,
  }: BuilderMainPaneHeaderProps) => {
    if (!root || !elementTree) {
      return null
    }

    return (
      <CreateElementButton
        createForm={elementService.createForm}
        elementTree={elementTree}
        key={0}
        selectedElementId={builderService.selectedNode?.id}
        title="Element"
      />
    )
  },
)

BuilderExplorerPaneHeader.displayName = 'BuilderMainPaneHeader'
