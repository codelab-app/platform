import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  COMPONENT_SERVICE,
  ELEMENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  CreateElementButton,
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { DisplayIf } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import {
  BuilderTab,
  IBuilderService,
  IElement,
  IElementService,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { MainPaneMobxState } from './mobx-state/MainPaneMobxState'
import { MainPaneToolbox } from './toolbox/MainPaneToolbox'
import { MainPaneTree } from './tree'

const { Search } = Input

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.MobxState]: 'Mobx State',
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Element Tree',
}

const headerFactory = (
  tab: BuilderTab,
  root: Nullable<IElement>,
  onSearch: (input: string) => void,
  elementService: IElementService,
  builderService: IBuilderService,
) => {
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

  return undefined
}

export const MainPane = observer<
  WithServices<
    ATOM_SERVICE | COMPONENT_SERVICE | ELEMENT_SERVICE | BUILDER_SERVICE
  >
>(({ atomService, builderService, elementService, componentService }) => {
  const builderTab = builderService.builderTab
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useCallback(
    (_v: string) =>
      debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
    [],
  )

  const root = elementService.elementTree?.root

  return (
    <MainPaneTemplate
      containerProps={{
        onClick: () => builderService.set_selectedElement(null),
      }}
      header={headerFactory(
        builderTab,
        root ?? null,
        debouncedSearch,
        elementService,
        builderService,
      )}
      key={root?.id ?? 'main-pane-builder'}
      title={paneTitles[builderTab]}
    >
      <DisplayIf condition={builderTab === BuilderTab.Tree}>
        <MainPaneTree
          builderService={builderService}
          elementService={elementService}
        />
      </DisplayIf>

      <DisplayIf condition={builderTab === BuilderTab.MobxState}>
        <MainPaneMobxState renderService={builderService.builderRenderer} />
      </DisplayIf>

      <DisplayIf condition={builderTab === BuilderTab.Toolbox}>
        <MainPaneToolbox
          atomService={atomService}
          componentService={componentService}
          searchQuery={searchValue}
        />
      </DisplayIf>

        <DisplayIf condition={builderTab === BuilderTab.MobxState}>
          <MainPaneMobxState builderService={builderService} />
        </DisplayIf>
