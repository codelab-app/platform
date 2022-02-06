import {
  CreateElementButton,
  CreateElementModal,
  DeleteElementModal,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { EqualityConditionalView } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { IElement } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { debounce } from 'lodash'
import React, { useCallback, useState } from 'react'
import { useBuilderSelectedElement, useBuilderTab } from '../../hooks'
import { BuilderTab } from '../../store'
import { MainPaneBuilderToolboxTab } from './tabs/MainPaneBuilderToolboxTab'
import { MainPaneBuilderTreeTab } from './tabs/MainPaneBuilderTreeTab'

const { Search } = Input

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Element Tree',
}

const headerFactory = (
  tab: BuilderTab,
  root: Maybe<IElement>,
  onSearch: (input: string) => void,
) => {
  if (tab === BuilderTab.Tree && root) {
    return <CreateElementButton key={0} parentElementId={root.id} />
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

  return undefined
}

export interface MainPaneBuilderProps {
  isComponentBuilder?: boolean
}

/** Requires ElementGraphContext */
export const MainPaneBuilder = ({
  isComponentBuilder,
}: MainPaneBuilderProps) => {
  const { builderTab } = useBuilderTab()
  const { elementTree } = useElementGraphContext()
  const { selectedElement, resetSelection } = useBuilderSelectedElement()

  const root = isComponentBuilder
    ? elementTree.getRootComponent()
    : elementTree.getRootElement()

  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useCallback(
    (_v: string) =>
      debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
    [],
  )

  return (
    <MainPaneTemplate
      containerProps={{ onClick: () => resetSelection() }}
      header={headerFactory(builderTab, root, debouncedSearch)}
      key={root?.id ?? 'main-pane-builder'}
      title={paneTitles[builderTab]}
    >
      <EqualityConditionalView
        expectedValue={BuilderTab.Tree}
        value={builderTab}
      >
        <MainPaneBuilderTreeTab isComponentBuilder={isComponentBuilder} />
      </EqualityConditionalView>

      <EqualityConditionalView
        expectedValue={BuilderTab.Toolbox}
        value={builderTab}
      >
        <MainPaneBuilderToolboxTab searchQuery={searchValue} />
      </EqualityConditionalView>

      <CreateElementModal parentElementId={selectedElement?.id} />
      <DeleteElementModal tree={elementTree} />
    </MainPaneTemplate>
  )
}
