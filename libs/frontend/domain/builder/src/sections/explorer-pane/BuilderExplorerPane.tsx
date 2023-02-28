import { ApartmentOutlined, DatabaseOutlined } from '@ant-design/icons'
import type {
  IActionService,
  IBuilderService,
  IComponentService,
  IElementService,
  IFieldService,
  IRenderService,
  IResourceService,
  IStore,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { RendererTab } from '@codelab/frontend/abstract/core'
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
  componentService: IComponentService
  elementService: IElementService
  actionService: IActionService
  builderService: IBuilderService
  userService: IUserService
  renderService: IRenderService
  pageId: string
  storeId: string
  fieldService: IFieldService
  appStore?: IStore
  typeService: ITypeService
  resourceService: IResourceService
}

export const StoreHeader = ({ children, extra }: StoreHeaderProps) => (
  <div css={tw`flex justify-between`}>
    <span css={tw`text-sm font-bold`}>{children}</span>
    <div>{extra}</div>
  </div>
)

export const BuilderExplorerPane = observer<BuilderMainPaneProps>(
  ({
    builderService,
    elementService,
    componentService,
    actionService,
    userService,
    pageId,
    storeId,
    renderService,
    appStore,
    fieldService,
    typeService,
    resourceService,
  }) => {
    const pageBuilderRenderer = renderService.renderers.get(pageId)
    const root = pageBuilderRenderer?.pageTree?.current.root
    const pageTree = pageBuilderRenderer?.pageTree?.current
    const componentId = builderService.activeComponent?.id

    const componentTree = componentId
      ? renderService.renderers.get(componentId)?.pageTree?.current
      : null

    const activeElementTree = componentTree || pageTree
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

    const tabItems = [
      {
        label: (
          <div>
            <ApartmentOutlined title="Explorer" />
            Explorer
          </div>
        ),
        key: 'explorer',
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
          </ExplorerPaneTemplate>
        ),
      },
      {
        label: (
          <div>
            <DatabaseOutlined title="Store" />
            Store
          </div>
        ),
        key: 'store',
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
        {activeElementTree && (
          <CreateElementModal
            actionService={actionService}
            activeElementTree={activeElementTree}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
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
        <CreateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <UpdateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <DeleteFieldModal fieldService={fieldService} />
        <CreateActionModal
          actionService={actionService}
          resourceService={resourceService}
          store={appStore}
        />
        <UpdateActionModal
          actionService={actionService}
          resourceService={resourceService}
        />
        <DeleteActionsModal actionService={actionService} />
      </>
    )
  },
)

BuilderExplorerPane.displayName = 'BuilderMainPane'
