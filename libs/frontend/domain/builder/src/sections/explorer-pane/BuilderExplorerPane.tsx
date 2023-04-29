import { ApartmentOutlined, DatabaseOutlined } from '@ant-design/icons'
import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  isComponentPageNode,
  isElementPageNode,
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
import {
  ActionsList,
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  GetStateList,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import {
  CodeMirrorEditor,
  ExplorerPaneTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@emotion/react'
import { Collapse, Divider, Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import { renderStickyTabBar } from '../stickyTabBarRenderer'
import { BuilderTree } from './builder-tree'
import { BuilderExplorerPaneHeader } from './BuilderExplorerPane-Header'

const { Panel } = Collapse

type StoreHeaderProps = PropsWithChildren<{
  extra?: ReactNode
}>

interface BuilderExplorerPaneProps {
  isLoading?: boolean
}

export const StoreHeader = ({ children, extra }: StoreHeaderProps) => (
  <div css={tw`flex justify-between`}>
    <span css={tw`text-sm font-bold`}>{children}</span>
    <div>{extra}</div>
  </div>
)

export const BuilderExplorerPane = observer<BuilderExplorerPaneProps>(
  ({ isLoading = true }) => {
    const {
      actionService,
      builderRenderService,
      builderService,
      componentService,
      elementService,
      fieldService,
      pageService,
    } = useStore()

    const pageId = useCurrentPageId()
    const page = pageService.pages.get(pageId)
    const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
    const pageTree = pageBuilderRenderer?.elementTree.maybeCurrent
    const root = !isLoading ? pageTree?.rootElement : undefined
    const antdTree = root?.current.antdNode
    const componentsAntdTree = componentService.componentAntdNode
    const isPageTree = antdTree && pageTree
    const store = page?.store.maybeCurrent

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
              )}

              {pageBuilderRenderer && (
                <>
                  <Divider />
                  <div css={tw`flex justify-end`}>
                    <CreateComponentButton title="Component" />
                  </div>
                </>
              )}

              {antdTree && (
                <BuilderTree
                  expandedNodeIds={builderService.expandedComponentTreeNodeIds}
                  selectTreeNode={selectTreeNode}
                  setActiveTab={() =>
                    builderService.setActiveTab(RendererTab.Component)
                  }
                  setExpandedNodeIds={builderService.setExpandedComponentTreeNodeIds.bind(
                    builderService,
                  )}
                  treeData={componentsAntdTree}
                />
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
      {
        children: (
          <SkeletonWrapper isLoading={isLoading}>
            <Collapse css={tw`w-full mb-2`} defaultActiveKey={['1']} ghost>
              <Panel
                header={
                  <StoreHeader
                    extra={
                      <CreateFieldButton
                        fieldService={fieldService}
                        interfaceId={store?.api.id}
                      />
                    }
                  >
                    State
                  </StoreHeader>
                }
                key="1"
              >
                <GetStateList fieldService={fieldService} store={store} />
              </Panel>

              <Divider />
              <Panel
                header={
                  <StoreHeader
                    extra={<CreateActionButton actionService={actionService} />}
                  >
                    Actions
                  </StoreHeader>
                }
                key="2"
              >
                <ActionsList actionService={actionService} store={store} />
              </Panel>
            </Collapse>
            <StoreHeader>Store Inspector</StoreHeader>
            <CodeMirrorEditor
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              overrideStyles={css`
                ${tw`mt-1`}
              `}
              singleLine={false}
              title="Current props"
              value={store?.jsonString}
            />
          </SkeletonWrapper>
        ),
        key: 'store',
        label: (
          <div>
            <DatabaseOutlined title="Store" />
            Store
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
