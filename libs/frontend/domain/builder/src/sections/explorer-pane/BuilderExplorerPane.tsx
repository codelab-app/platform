import { ApartmentOutlined, DatabaseOutlined } from '@ant-design/icons'
import type { IPageNode, IStore } from '@codelab/frontend/abstract/core'
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
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  GetActionsList,
  GetStateList,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import { CodeMirrorEditor } from '@codelab/frontend/view/components'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
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

interface BuilderMainPaneProps {
  appStore?: IStore
  pageId: string
  storeId: string
}

export const StoreHeader = ({ children, extra }: StoreHeaderProps) => (
  <div css={tw`flex justify-between`}>
    <span css={tw`text-sm font-bold`}>{children}</span>
    <div>{extra}</div>
  </div>
)

export const BuilderExplorerPane = observer<BuilderMainPaneProps>(
  ({ appStore, pageId, storeId }) => {
    const {
      actionService,
      builderRenderService,
      builderService,
      componentService,
      elementService,
      fieldService,
      resourceService,
      typeService,
      userService,
    } = useStore()

    const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
    console.log(pageBuilderRenderer, pageBuilderRenderer?.elementTree)

    const root = pageBuilderRenderer?.elementTree.maybeCurrent?.root
    const pageTree = pageBuilderRenderer?.elementTree.maybeCurrent
    const componentId = builderService.activeComponent?.id

    const componentTree = componentId
      ? builderRenderService.renderers.get(componentId)?.elementTree.current
      : null

    const antdTree = root?.antdNode
    const componentsAntdTree = componentService.componentAntdNode
    const isPageTree = antdTree && pageTree

    const createStateFieldButton = (
      <CreateFieldButton
        fieldService={fieldService}
        interfaceId={appStore?.api.current.id}
      />
    )

    const createActionButton = (
      <CreateActionButton actionService={actionService} />
    )

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
                elementTree={pageTree}
                root={root ?? null}
              />
            }
            key={root?.id ?? 'main-pane-builder'}
            title="Page"
          >
            {!pageBuilderRenderer && <Spin />}

            {isPageTree && (
              <BuilderTree
                className="page-builder"
                elementTree={pageTree}
                expandedNodeIds={builderService.expandedPageElementTreeNodeIds}
                selectTreeNode={selectTreeNode}
                setActiveTree={() =>
                  builderService.setActiveTree(RendererTab.Page)
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
                  <CreateComponentButton
                    componentService={componentService}
                    title="Component"
                  />
                </div>
              </>
            )}

            {antdTree && (
              <BuilderTree
                elementTree={componentTree ?? null}
                expandedNodeIds={builderService.expandedComponentTreeNodeIds}
                selectTreeNode={selectTreeNode}
                setActiveTree={() =>
                  builderService.setActiveTree(RendererTab.Component)
                }
                setExpandedNodeIds={builderService.setExpandedComponentTreeNodeIds.bind(
                  builderService,
                )}
                treeData={componentsAntdTree}
              />
            )}
          </ExplorerPaneTemplate>
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
          <>
            <Collapse css={tw`w-full mb-2`} defaultActiveKey={['1']} ghost>
              <Panel
                header={
                  <StoreHeader extra={createStateFieldButton}>
                    State
                  </StoreHeader>
                }
                key="1"
              >
                <GetStateList fieldService={fieldService} store={appStore} />
              </Panel>

              <Divider />
              <Panel
                header={
                  <StoreHeader extra={createActionButton}>Actions</StoreHeader>
                }
                key="2"
              >
                <GetActionsList
                  actionService={actionService}
                  store={appStore}
                />
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
              value={appStore?.state.jsonString}
            />
          </>
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
          `}
          defaultActiveKey="1"
          items={tabItems}
          renderTabBar={renderStickyTabBar}
          size="small"
        />
        <CreateElementModal
          elementService={elementService}
          storeId={storeId}
          userService={userService}
        />
        <CreateComponentModal />
        <DeleteComponentModal componentService={componentService} />
        <DeleteElementModal
          builderService={builderService}
          elementService={elementService}
        />
        <CreateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <UpdateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <DeleteFieldModal fieldService={fieldService} />

        <CreateActionModal store={appStore} />
        <UpdateActionModal />
        <DeleteActionsModal actionService={actionService} />
      </>
    )
  },
)

BuilderExplorerPane.displayName = 'BuilderMainPane'
