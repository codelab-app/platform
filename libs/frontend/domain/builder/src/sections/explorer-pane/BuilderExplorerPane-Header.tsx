import {
  BuilderTab,
  IBuilderService,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/domain/element'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface BuilderMainPaneHeaderProps {
  elementService: IElementService
  builderService: IBuilderService
  tab: BuilderTab
  root: Nullable<IElement>
  onSearch: (input: string) => void
}

const { Search } = Input

export const BuilderExplorerPaneHeader = observer(
  ({
    tab,
    root,
    onSearch,
    elementService,
    builderService,
  }: BuilderMainPaneHeaderProps) => {
    if (tab === BuilderTab.Tree && root) {
      return (
        <CreateElementButton
          createModal={elementService.createModal}
          key={0}
          parentElementId={builderService.selectedNode?.id || root.id}
        />
      )
    }

    if (tab === BuilderTab.Toolbox) {
      return (
        <Search
          allowClear
          key={1}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search toolbox"
        />
      )
    }

    return null
  },
)

BuilderExplorerPaneHeader.displayName = 'BuilderMainPaneHeader'
