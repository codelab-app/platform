import {
  BUILDER_SERVICE,
  DETACHED_ELEMENT_SERVICE,
  ELEMENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { CreateElementButton } from '@codelab/frontend/modules/element'
import { BuilderTab, IElement } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import React from 'react'

type BuilderMainPaneHeaderProps = WithServices<
  ELEMENT_SERVICE | DETACHED_ELEMENT_SERVICE | BUILDER_SERVICE
> & {
  tab: BuilderTab
  root: Nullable<IElement>
  onSearch: (input: string) => void
}

const { Search } = Input

export const BuilderMainPaneHeader = ({
  tab,
  root,
  onSearch,
  elementService,
  detachedElementService,
  builderService,
}: BuilderMainPaneHeaderProps) => {
  if (tab === BuilderTab.Tree && root) {
    return (
      <CreateElementButton
        elementService={elementService}
        key={0}
        parentElementId={builderService.selectedElement?.id || root.id}
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
}
