import { PlusOutlined } from '@ant-design/icons'
import type { IPageNode, IStoreModel } from '@codelab/frontend/abstract/core'
import {
  elementRef,
  elementTreeRef,
  isComponentModel,
  isComponentPageNode,
  isElementPageNode,
  isElementPageNodeRef,
  RendererTab,
  storeRef,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { FormNames } from '@codelab/frontend/abstract/types'
import { DeleteComponentModal } from '@codelab/frontend/application/component'
import {
  CreateElementPopover,
  DeleteElementModal,
} from '@codelab/frontend/application/element'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  ActionsTreeView,
  CreateActionPopover,
  DeleteActionModal,
  StateTreeView,
  UpdateActionPopover,
} from '@codelab/frontend/application/store'
import {
  CreateFieldModal,
  CreateFieldPopover,
  DeleteFieldModal,
  UpdateFieldModal,
  UpdateFieldPopover,
} from '@codelab/frontend/application/type'
import { mapElementOption } from '@codelab/frontend/domain/element'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import {
  useCurrentComponent,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Collapse } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
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

    const { popover } = useCui()
    const page = useCurrentPage()
    const { component } = useCurrentComponent()
    const pageBuilderRenderer = page && renderService.renderers.get(page.id)

    const componentBuilderRenderer =
      component && renderService.renderers.get(component.id)

    const pageTree = (pageBuilderRenderer ?? componentBuilderRenderer)
      ?.elementTree.maybeCurrent

    const root = !isLoading ? pageTree?.rootElement : undefined
    const antdTree = root?.current.treeViewNode
    const isPageTree = antdTree && pageTree
    const store = builderService.selectedNode?.current.store.current

    const providerStore = isElementPageNodeRef(builderService.selectedNode)
      ? builderService.selectedNode.current.providerStore?.current
      : undefined

    const componentStore =
      isElementPageNodeRef(builderService.selectedNode) &&
      isComponentModel(builderService.selectedNode.current.renderType.current)
        ? builderService.selectedNode.current.renderType.current.store.current
        : undefined

    const selectTreeNode = (node: IPageNode) => {
      if (isComponentPageNode(node)) {
        return builderService.selectComponentNode(node)
      }

      if (isElementPageNode(node)) {
        return builderService.selectElementNode(node)
      }
    }

    const sidebarViews: Array<CuiSidebarView> = [
      {
        content: pageTree && isPageTree && (
          <ElementTreeView
            expandedNodeIds={builderService.expandedPageElementTreeNodeIds}
            selectTreeNode={selectTreeNode}
            setActiveTab={() => builderService.setActiveTab(RendererTab.Page)}
            setExpandedNodeIds={builderService.setExpandedPageElementTreeNodeIds.bind(
              builderService,
            )}
            treeData={antdTree}
          />
        ),
        isLoading: isLoading || !pageTree,
        key: 'ElementTree',
        label: 'Elements Tree',
        toolbar: {
          items: [
            {
              icon: <PlusOutlined />,
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
                popover.open(FormNames.CreateElement)
              },
              title: 'Add Element',
            },
          ],
          title: 'Element Tree Toolbar',
        },
      },
      {
        content: store && <StateTreeView store={store} />,
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

                if (store.api.id) {
                  form.open(typeRef(store.api.id) as Ref<InterfaceType>)
                  popover.open(FormNames.CreateField)
                }
              },
              title: 'Add Field',
            },
          ],
          title: 'State Toolbar',
        },
      },
      {
        content: store && <ActionsTreeView store={store} />,
        isLoading: isLoading || !store,
        key: 'Actions',
        label: 'Actions',
        toolbar: {
          items: [
            {
              icon: <PlusOutlined />,
              key: 'AddAction',
              onClick: () => {
                if (!store) {
                  return
                }

                actionService.createForm.open(
                  storeRef(store) as Ref<IStoreModel>,
                )
                popover.open(FormNames.CreateAction)
              },
              title: 'Add Action',
            },
          ],
          title: 'Actions Toolbar',
        },
      },
      {
        content: store && (
          <Collapse ghost size="small">
            <Collapse.Panel header="Local Store" key="localStore">
              <CodeMirrorEditor
                className="mt-1"
                editable={false}
                language={CodeMirrorLanguage.Json}
                onChange={() => undefined}
                singleLine={false}
                title="Local Store"
                value={store.jsonString}
              />
            </Collapse.Panel>
            {componentStore ? (
              <Collapse.Panel header="Component Store" key="componentStore">
                <CodeMirrorEditor
                  className="mt-1"
                  editable={false}
                  language={CodeMirrorLanguage.Json}
                  onChange={() => undefined}
                  singleLine={false}
                  title="Component Store"
                  value={componentStore.jsonString}
                />
              </Collapse.Panel>
            ) : (
              ''
            )}
            {providerStore && page?.kind === IPageKind.Regular ? (
              <Collapse.Panel header="Root Store" key="rootStore">
                <CodeMirrorEditor
                  className="mt-1"
                  editable={false}
                  language={CodeMirrorLanguage.Json}
                  onChange={() => undefined}
                  singleLine={false}
                  title="Root Store"
                  value={providerStore.jsonString}
                />
              </Collapse.Panel>
            ) : (
              ''
            )}
          </Collapse>
        ),
        isLoading: isLoading || !store,
        key: 'Inspector',
        label: 'Inspector',
      },
    ]

    return (
      <>
        <CuiSidebar
          defaultActiveViewKeys={['ElementTree']}
          label="Explorer"
          popover={
            <>
              <UpdateFieldPopover />
              <CreateFieldPopover />
              <CreateElementPopover />
              <CreateActionPopover />
              <UpdateActionPopover />
            </>
          }
          views={sidebarViews}
        />
        <CreateFieldModal />
        <UpdateFieldModal />
        <DeleteFieldModal />
        <DeleteComponentModal />
        <DeleteElementModal />
        <DeleteActionModal />
      </>
    )
  },
)

BuilderPrimarySidebar.displayName = 'BuilderMainPane'
