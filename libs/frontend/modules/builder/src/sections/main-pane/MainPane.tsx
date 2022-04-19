import { WithAtomService } from '@codelab/frontend/modules/atom'
import { WithComponentService } from '@codelab/frontend/modules/component'
import {
  CreateElementButton,
  CreateElementModal,
  DeleteElementModal,
  Element,
  ElementService,
  WithElementService,
} from '@codelab/frontend/modules/element'
import { DisplayIf } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { BuilderService, WithBuilderService } from '../../store/BuilderService'
import { BuilderTab } from '../../store/BuilderTab'
import { MainPaneMobxState } from './mobx-state/MainPaneMobxState'
import { MainPaneToolbox } from './toolbox/MainPaneToolbox'
import { MainPaneTree } from './tree/MainPaneTree'

const { Search } = Input

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.MobxState]: 'Mobx State',
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Element Tree',
}

const headerFactory = (
  tab: BuilderTab,
  root: Nullable<Element>,
  onSearch: (input: string) => void,
  elementService: ElementService,
  builderService: BuilderService,
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

export type MainPaneProps = WithAtomService &
  WithBuilderService &
  WithElementService &
  WithComponentService

export const MainPane = observer<MainPaneProps>(
  ({ atomService, builderService, elementService, componentService }) => {
    const builderTab = builderService.builderTab
    const [searchValue, setSearchValue] = useState('')

    const debouncedSearch = useCallback(
      (_v: string) =>
        debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
      [],
    )

    const root = elementService.elementTree?.root?.maybeCurrent

    console.log(root)

    return (
      <MainPaneTemplate
        containerProps={{
          onClick: () => builderService.setSelectedElement(null),
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

        <CreateElementModal elementService={elementService} />
        <DeleteElementModal elementService={elementService} />
      </MainPaneTemplate>
    )
  },
)
