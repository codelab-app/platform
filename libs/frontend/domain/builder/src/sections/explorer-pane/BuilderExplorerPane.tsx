import { ApartmentOutlined } from '@ant-design/icons'
import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  isComponentPageNode,
  isElementPageNode,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/domain/component'
import {
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/domain/element'
import {
  CreateActionModal,
  DeleteActionsModal,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import {
  ExplorerPaneTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { css } from '@emotion/react'
import { Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { renderStickyTabBar } from '../StickyTabBarRenderer'
import { BuilderTree } from './builder-tree'
import { BuilderExplorerPaneHeader } from './BuilderExplorerPaneHeader'
import { StorePane } from './StorePane'

export const BuilderExplorerPane = observer<{ isLoading?: boolean }>(
  ({ isLoading = true }) => {
    const {
      actionService,
      builderRenderService,
      builderService,
      elementService,
    } = useStore()

    const pageId = useCurrentPageId()
    const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
    const pageTree = pageBuilderRenderer?.elementTree.maybeCurrent
    const root = !isLoading ? pageTree?.rootElement : undefined
    const antdTree = root?.current.antdNode
    const isPageTree = antdTree && pageTree
    const store = builderService.selectedNode?.current.store.current

    const selectTreeNode = (node: IPageNode) => {
      if (isComponentPageNode(node)) {
        return builderService.selectComponentNode(node)
      }

      if (isElementPageNode(node)) {
        return builderService.selectElementNode(node)
      }

      return
    }

    const tabItems = [
      {
        children: (
          <SkeletonWrapper isLoading={isLoading}>
            <ExplorerPaneTemplate
              header={
                <BuilderExplorerPaneHeader
                  builderService={builderService}
                  elementService={elementService}
                  elementTree={pageTree}
                  root={root?.maybeCurrent}
                />
              }
              key={root?.id ?? 'main-pane-builder'}
              title="Page"
            >
              {!pageBuilderRenderer && <Spin />}

              {isPageTree && (
                <>
                  <BuilderTree
                    className="page-builder"
                    expandedNodeIds={
                      builderService.expandedPageElementTreeNodeIds
                    }
                    selectTreeNode={selectTreeNode}
                    setActiveTab={() =>
                      builderService.setActiveTab(RendererTab.Page)
                    }
                    setExpandedNodeIds={builderService.setExpandedPageElementTreeNodeIds.bind(
                      builderService,
                    )}
                    treeData={antdTree}
                  />
                  <StorePane isLoading={isLoading} store={store} />
                </>
              )}
            </ExplorerPaneTemplate>
          </SkeletonWrapper>
        ),
        key: 'explorer',
        label: (
          <div>
            <ApartmentOutlined title="Explorer" />
            Explorer
          </div>
        ),
      },
    ]

    return (
      <>
        <Tabs
          css={css`
            ${tw`px-4 h-full w-full`}
            .ant-page-header-content,
            .ant-collapse-header,
            .ant-page-header-heading {
              ${tw`px-0! mt-0!`}
            }

            .ant-tabs-tabpane {
              height: 100%;
            }

            .ant-tabs-content-holder {
              display: flex;
            }
          `}
          defaultActiveKey="1"
          destroyInactiveTabPane
          items={tabItems}
          renderTabBar={renderStickyTabBar}
          size="small"
        />
        <CreateElementModal />
        <CreateComponentModal />
        <DeleteComponentModal />
        <DeleteElementModal />
        <CreateFieldModal />
        <UpdateFieldModal />
        <DeleteFieldModal />

        <CreateActionModal store={store} />
        <UpdateActionModal />
        <DeleteActionsModal />
      </>
    )
  },
)

BuilderExplorerPane.displayName = 'BuilderMainPane'
