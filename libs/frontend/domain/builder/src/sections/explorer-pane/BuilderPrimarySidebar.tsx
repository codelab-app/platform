import { PlusOutlined } from '@ant-design/icons'
import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  elementRef,
  elementTreeRef,
  isComponentPageNode,
  isElementPageNode,
  RendererTab,
  typeRef,
} from '@codelab/frontend/abstract/core'
import {
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/domain/component'
import {
  CreateElementForm,
  DeleteElementModal,
  mapElementOption,
} from '@codelab/frontend/domain/element'
import {
  ActionsList,
  CreateActionModal,
  DeleteActionModal,
  StateTreeView,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import {
  CreateFieldForm,
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldForm,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import type { CuiSidebarView } from '@codelab/frontend/presentation//codelab-ui'
import { CuiSidebar } from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@emotion/react'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ElementTreeView } from './builder-tree'

export const BuilderPrimarySidebar = observer<{ isLoading?: boolean }>(
  ({ isLoading = true }) => {
    const {
      actionService,
      builderService,
      elementService,
      fieldService,
      renderService,
    } = useStore()

    const pageId = useCurrentPageId()
    const pageBuilderRenderer = renderService.renderers.get(pageId)
    const pageTree = pageBuilderRenderer?.elementTree.maybeCurrent
    const root = !isLoading ? pageTree?.rootElement : undefined
    const antdTree = root?.current.treeViewNode
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

    const sidebarViews: Array<CuiSidebarView> = [
      {
        content: pageTree && (
          <>
            {isPageTree && !elementService.createForm.isOpen && (
              <ElementTreeView
                expandedNodeIds={builderService.expandedPageElementTreeNodeIds}
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
            {elementService.createForm.isOpen && (
              <div css={tw`p-2`}>
                <CreateElementForm />
              </div>
            )}
          </>
        ),
        isLoading: isLoading || !pageTree,
        key: 'ElementTree',
        label: 'Elements Tree',
        toolbar: {
          items: [
            {
              icon: <PlusOutlined></PlusOutlined>,
              key: 'Add Element',
              onClick: () => {
                if (!pageTree) {
                  return
                }

                const selectedElementId = builderService.selectedNode?.id

                const selectedElement = selectedElementId
                  ? elementRef(selectedElementId)
                  : undefined

                elementService.createForm.open({
                  elementOptions: pageTree.elements.map(mapElementOption),
                  elementTree: elementTreeRef(pageTree.id),
                  selectedElement,
                })
              },
              title: 'Add Element',
            },
          ],
          title: 'Element Tree Toolbar',
        },
      },
      {
        content: store && (
          <>
            {!fieldService.createForm.isOpen &&
              !fieldService.updateForm.isOpen && (
                <StateTreeView store={store} />
              )}
            {fieldService.createForm.isOpen && (
              <div css={tw`p-2`}>
                <CreateFieldForm />
              </div>
            )}
            {fieldService.updateForm.isOpen && (
              <div css={tw`p-2`}>
                <UpdateFieldForm />
              </div>
            )}
          </>
        ),
        isLoading: isLoading || !store,
        key: 'StateList',
        label: 'State',
        toolbar: {
          items: [
            {
              icon: <PlusOutlined />,
              key: 'AddStateField',
              onClick: () => {
                if (!store) {
                  return
                }

                const form = fieldService.createForm
                form.open(typeRef(store.api.id) as Ref<InterfaceType>)
              },
              title: 'Add Field',
            },
          ],
          title: 'State Toolbar',
        },
      },
      {
        content: store && <ActionsList store={store} />,
        isLoading: isLoading || !store,
        key: 'Actions',
        label: 'Actions',
        toolbar: {
          items: [
            {
              icon: <PlusOutlined />,
              key: 'AddAction',
              onClick: () => {
                actionService.createModal.open()
              },
              title: 'Add Action',
            },
          ],
          title: 'Actions Toolbar',
        },
      },
      {
        content: store && (
          <CodeMirrorEditor
            language={CodeMirrorLanguage.Json}
            onChange={() => undefined}
            overrideStyles={css`
              ${tw`mt-1`}
            `}
            singleLine={false}
            title="Current props"
            value={store.jsonString}
          />
        ),
        isLoading: isLoading || !store,
        key: 'Inspector',
        label: 'Inspector',
      },
    ]

    return (
      <>
        <CuiSidebar
          defaultActiveViewKeys={['ElementTree', 'StateList']}
          label="Explorer"
          views={sidebarViews}
        />
        <CreateComponentModal />
        <DeleteComponentModal />
        <DeleteElementModal />
        <CreateFieldModal />
        <UpdateFieldModal />
        <DeleteFieldModal />

        <CreateActionModal store={store} />
        <UpdateActionModal />
        <DeleteActionModal />
      </>
    )
  },
)

BuilderPrimarySidebar.displayName = 'BuilderMainPane'
