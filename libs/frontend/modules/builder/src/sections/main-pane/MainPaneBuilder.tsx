import {
  CreateElementButton,
  CreateElementModal,
  DeleteElementModal,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { EqualityConditionalView } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { IElement } from '@codelab/shared/abstract/core'
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
  root: IElement | undefined,
  onSearch: (input: string) => void,
) => {
  if (tab === BuilderTab.Tree && root) {
    return <CreateElementButton key={0} parentElementId={root.id} />
  }

  if (tab === BuilderTab.Toolbox) {
    return (
      <Search
        key={1}
        placeholder="Search toolbox"
        allowClear
        onChange={(e) => onSearch(e.target.value)}
      />
    )
  }

  return undefined
}

/** Requires ElementGraphContext */
export const MainPaneBuilder = () => {
  const { selectedElement, resetSelection } = useBuilderSelectedElement()
  const { builderTab } = useBuilderTab()
  const { elementTree } = useElementGraphContext()
  const root = elementTree?.getRootElement()
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useCallback(
    (_v: string) =>
      debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
    [],
  )

  return (
    <MainPaneTemplate
      key={root?.id ?? 'main-pane-builder'}
      title={paneTitles[builderTab]}
      header={headerFactory(builderTab, root, debouncedSearch)}
      containerProps={{ onClick: () => resetSelection() }}
    >
      <EqualityConditionalView
        value={builderTab}
        expectedValue={BuilderTab.Tree}
      >
        <MainPaneBuilderTreeTab />
      </EqualityConditionalView>

      <EqualityConditionalView
        value={builderTab}
        expectedValue={BuilderTab.Toolbox}
      >
        <MainPaneBuilderToolboxTab searchQuery={searchValue} />
      </EqualityConditionalView>

      <CreateElementModal
        initialData={{ parentElementId: selectedElement?.id }}
      />
      <DeleteElementModal />
    </MainPaneTemplate>
  )
}
