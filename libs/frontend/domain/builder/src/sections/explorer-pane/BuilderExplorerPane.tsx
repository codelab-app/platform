import {
  IActionService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElementService,
  IRenderService,
  IUserService,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/domain/component'
import {
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/domain/element'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { BuilderTree } from './builder-tree'
import { BuilderExplorerPaneHeader } from './BuilderExplorerPane-Header'

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
            root={root ?? null}
          />
        }
        key={root?.id ?? 'main-pane-builder'}
        title="Page"
      >
        {isPageTree && (
          <BuilderTree
            className="page-builder"
            elementTree={pageTree}
            expandedNodeIds={builderService.expandedPageElementTreeNodeIds}
            selectTreeNode={builderService.selectPageElementTreeNode.bind(
              builderService,
            )}
            setActiveTree={() => builderService.setActiveTree(RendererTab.Page)}
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

        {pageTree && (
          <CreateElementModal
            actionService={actionService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageId={pageId}
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
