import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/modules/component'
import {
  CreateElementModal,
  DeleteElementModal,
  elementRef,
} from '@codelab/frontend/modules/element'
import { componentRef } from '@codelab/frontend/presenter/container'
import { DisplayIf } from '@codelab/frontend/view/components'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import {
  BuilderTab,
  IActionService,
  IAtomService,
  IBuilderDataNode,
  IBuilderService,
  IComponentService,
  IElementService,
  IRenderService,
  IUserService,
  RendererTab,
} from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { EventDataNode } from 'antd/lib/tree'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import tw from 'twin.macro'
import { BuilderTree } from './builder-tree'
import { BuilderExplorerPaneHeader } from './BuilderExplorerPane-Header'
import { Toolbox } from './toolbox/Toolbox'

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Page',
}

interface BuilderMainPaneProps {
  atomService: IAtomService
  componentService: IComponentService
  elementService: IElementService
  actionService: IActionService
  builderService: IBuilderService
  userService: IUserService
  renderService: IRenderService
  pageId: string
  storeId: string
}

export const BuilderExplorerPane = observer<BuilderMainPaneProps>(
  ({
    atomService,
    builderService,
    elementService,
    componentService,
    actionService,
    userService,
    pageId,
    storeId,
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
    const isPageTree = antdTree && pageTree

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
          {isPageTree && (
            <BuilderTree
              className="page-builder"
              elementTree={pageTree}
              expandedNodeIds={builderService.expandedPageElementTreeNodeIds}
              selectTreeNode={builderService.selectPageElementTreeNode.bind(
                builderService,
              )}
              setActiveTree={() =>
                builderService.setActiveTree(RendererTab.Page)
              }
              setExpandedNodeIds={builderService.setExpandedPageElementTreeNodeIds.bind(
                builderService,
              )}
              treeData={antdTree}
            />
          )}
          <Divider />
          <div css={tw`flex justify-end`}>
            <CreateComponentButton componentService={componentService} />
          </div>
          {antdTree && (
            <BuilderTree
              elementTree={componentTree ?? null}
              expandedNodeIds={builderService.expandedComponentTreeNodeIds}
              selectTreeNode={builderService.selectComponentTreeNode.bind(
                builderService,
              )}
              setActiveTree={() =>
                builderService.setActiveTree(RendererTab.Component)
              }
              setExpandedNodeIds={builderService.setExpandedComponentTreeNodeIds.bind(
                builderService,
              )}
              treeData={componentsAntdTree}
            />
          )}
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
            actionService={actionService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageTree={pageTree}
            renderService={renderService}
            storeId={storeId}
            userService={userService}
          />
        )}
        <CreateComponentModal
          componentService={componentService}
          userService={userService}
        />
        <DeleteComponentModal componentService={componentService} />
        <DeleteElementModal
          builderService={builderService}
          elementService={elementService}
        />
      </ExplorerPaneTemplate>
    )
  },
)

BuilderExplorerPane.displayName = 'BuilderMainPane'
