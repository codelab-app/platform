import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  COMPONENT_SERVICE,
  ELEMENT_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentButton,
  CreateComponentModal,
} from '@codelab/frontend/modules/component'
import {
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { DisplayIf } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { BuilderTab } from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import tw from 'twin.macro'
import { BuilderTree } from './builder-tree'
import { BuilderMainPaneHeader } from './BuilderMainPaneHeader'
import { MobxStateContainer } from './mobx-state/MobxStateContainer'
import { Toolbox } from './toolbox/Toolbox'

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.MobxState]: 'Mobx State',
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Page',
}

export const BuilderMainPane = observer<
  WithServices<
    | ATOM_SERVICE
    | COMPONENT_SERVICE
    | ELEMENT_SERVICE
    | BUILDER_SERVICE
    | USER_SERVICE
  >
>(
  ({
    atomService,
    builderService,
    elementService,
    componentService,
    userService,
  }) => {
    const builderTab = builderService.builderTab
    const [searchValue, setSearchValue] = useState('')

    const debouncedSearch = useCallback(
      (_v: string) =>
        debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
      [],
    )

    const root = elementService.elementTree?.root
    const antdTree = elementService.elementTree.root?.antdNode
    const componentsAntdTree = componentService.componentAntdNode

    componentService.loadComponentTrees()

    const BaseBuilderTree = observer(
      ({ treeData }: { treeData: DataNode | undefined }) => (
        <BuilderTree
          builderRenderer={builderService.builderRenderer}
          element={elementService.element.bind(elementService)}
          elementContextMenuProps={{
            createModal: elementService.createModal,
            deleteModal: elementService.deleteModal,
            duplicateElement:
              elementService.duplicateElement.bind(elementService),
            convertElementToComponent:
              elementService.convertElementToComponent.bind(elementService),
            elementTree: elementService.elementTree,
          }}
          elementTree={elementService.elementTree}
          moveElement={elementService.moveElement.bind(elementService)}
          selectedElement={builderService.selectedElement}
          setHoveredElement={builderService.setHoveredElement.bind(
            builderService,
          )}
          set_selectedElement={builderService.set_selectedElement.bind(
            builderService,
          )}
          treeData={treeData}
        />
      ),
    )

    return (
      <MainPaneTemplate
        containerProps={{
          onClick: () => builderService.set_selectedElement(null),
        }}
        header={() => (
          <BuilderMainPaneHeader
            builderService={builderService}
            elementService={elementService}
            onSearch={debouncedSearch}
            root={root ?? null}
            tab={builderTab}
          />
        )}
        key={root?.id ?? 'main-pane-builder'}
        title={paneTitles[builderTab]}
      >
        <DisplayIf condition={builderTab === BuilderTab.Tree}>
          <BaseBuilderTree treeData={antdTree} />
          <Divider />
          <div css={tw`flex justify-end`}>
            <CreateComponentButton componentService={componentService} />
          </div>
          <BaseBuilderTree treeData={componentsAntdTree} />
        </DisplayIf>

        <DisplayIf condition={builderTab === BuilderTab.MobxState}>
          <MobxStateContainer builderService={builderService} />
        </DisplayIf>

        <DisplayIf condition={builderTab === BuilderTab.Toolbox}>
          <Toolbox
            atomService={atomService}
            componentService={componentService}
            searchQuery={searchValue}
          />
        </DisplayIf>

        <CreateElementModal
          elementService={elementService}
          userService={userService}
        />
        <CreateComponentModal
          componentService={componentService}
          userService={userService}
        />
        <DeleteElementModal elementService={elementService} />
      </MainPaneTemplate>
    )
  },
)
