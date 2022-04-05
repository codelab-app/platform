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
import { EqualityConditionalView } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { BuilderService, WithBuilderService } from '../../store/BuilderService'
import { BuilderTab } from '../../store/BuilderTab'
import { MainPaneBuilderMobxStateTab } from './tabs/MainPaneBuilderMobxStateTab'
import { MainPaneBuilderToolboxTab } from './tabs/MainPaneBuilderToolboxTab'
import { MainPaneBuilderTreeTab } from './tabs/MainPaneBuilderTreeTab'

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

export type MainPaneBuilderProps = WithAtomService &
  WithBuilderService &
  WithElementService &
  WithComponentService

export const MainPaneBuilder = observer<MainPaneBuilderProps>(
  ({ atomService, builderService, elementService, componentService }) => {
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
        <EqualityConditionalView
          expectedValue={BuilderTab.Tree}
          value={builderTab}
        >
          <MainPaneBuilderTreeTab
            builderService={builderService}
            elementService={elementService}
          />
        </EqualityConditionalView>

        <EqualityConditionalView
          expectedValue={BuilderTab.MobxState}
          value={builderTab}
        >
          <MainPaneBuilderMobxStateTab
            renderService={builderService.builderRenderer}
          />
        </EqualityConditionalView>

        <EqualityConditionalView
          expectedValue={BuilderTab.Toolbox}
          value={builderTab}
        >
          <MainPaneBuilderToolboxTab
            atomService={atomService}
            componentService={componentService}
            searchQuery={searchValue}
          />
        </EqualityConditionalView>

        <CreateElementModal elementService={elementService} />
        <DeleteElementModal elementService={elementService} />
      </MainPaneTemplate>
    )
  },
)
