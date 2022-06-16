import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  COMPONENT_SERVICE,
  ELEMENT_SERVICE,
  RENDER_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/modules/component'
import {
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { DisplayIf } from '@codelab/frontend/view/components'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { BuilderTab, RendererTab } from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import tw from 'twin.macro'
import { BuilderTree } from './builder-tree'
import { BuilderExplorerPaneHeader } from './BuilderExplorerPane-Header'
import { MobxStateContainer } from './mobx-state/MobxStateContainer'
import { Toolbox } from './toolbox/Toolbox'

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.MobxState]: 'Mobx State',
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Page',
}

type BuilderMainPaneProps = WithServices<
  | ATOM_SERVICE
  | COMPONENT_SERVICE
  | ELEMENT_SERVICE
  | BUILDER_SERVICE
  | USER_SERVICE
  | RENDER_SERVICE
> & {
  pageId: string
}

export const BuilderExplorerPane = observer<BuilderMainPaneProps>(
  ({
    atomService,
    builderService,
    elementService,
    componentService,
    userService,
    pageId,
    renderService,
  }) => {
    const builderTab = builderService.activeBuilderTab
    const [searchValue, setSearchValue] = useState('')

    const debouncedSearch = useCallback((value: string) => {
      const debouncedSetSearchValue = debounce(
        (nextValue: string) => setSearchValue(nextValue),
        200,
      )

      return debouncedSetSearchValue(value)
    }, [])

    const pageBuilderRenderer = renderService.renderers.get(pageId)

    if (!pageBuilderRenderer) {
      return null
      // throw new Error('Missing page builder renderer')
    }

    const root = pageBuilderRenderer.pageTree?.current.root
    const pageTree = pageBuilderRenderer.pageTree?.current
    const componentId = builderService.activeComponent?.id

    const componentTree = componentId
      ? renderService.renderers.get(componentId)?.pageTree?.current
      : null

    const antdTree = root?.antdNode
    const componentsAntdTree = componentService.componentAntdNode

    return (
      <ExplorerPaneTemplate
        containerProps={{
          onClick: () => {
            // builderService.set_selectedElement(null)
          },
        }}
        header={
          <BuilderExplorerPaneHeader
            builderService={builderService}
            elementService={elementService}
            onSearch={debouncedSearch}
            root={root ?? null}
            tab={builderTab}
          />
        }
        key={root?.id ?? 'main-pane-builder'}
        title={paneTitles[builderTab]}
      >
        <DisplayIf condition={builderTab === BuilderTab.Tree}>
          {antdTree && pageTree ? (
            <BuilderTree
              className="page-builder"
              elementTree={pageTree}
              setActiveTree={() =>
                builderService.setActiveTree(RendererTab.Page)
              }
              treeData={antdTree}
            />
          ) : null}
          <Divider />
          <div css={tw`flex justify-end`}>
            <CreateComponentButton componentService={componentService} />
          </div>
          {antdTree ? (
            <BuilderTree
              elementTree={componentTree ?? null}
              setActiveTree={() =>
                builderService.setActiveTree(RendererTab.Component)
              }
              treeData={componentsAntdTree}
            />
          ) : null}
        </DisplayIf>
        <DisplayIf condition={builderTab === BuilderTab.MobxState}>
          <MobxStateContainer
            builderService={builderService}
            renderer={pageBuilderRenderer}
          />
        </DisplayIf>
        <DisplayIf condition={builderTab === BuilderTab.Toolbox}>
          <Toolbox
            atomService={atomService}
            componentService={componentService}
            searchQuery={searchValue}
          />
        </DisplayIf>
        {pageTree && (
          <CreateElementModal
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageTree={pageTree}
            renderService={renderService}
            userService={userService}
          />
        )}
        <CreateComponentModal
          componentService={componentService}
          userService={userService}
        />
        <DeleteComponentModal componentService={componentService} />
        <DeleteElementModal elementService={elementService} />
      </ExplorerPaneTemplate>
    )
  },
)

BuilderExplorerPane.displayName = 'BuilderMainPane'
