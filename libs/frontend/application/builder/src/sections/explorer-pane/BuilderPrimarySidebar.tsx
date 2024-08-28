'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IComponentModel,
  IInterfaceTypeModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { isComponent, isPage, typeRef } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import {
  useCurrentComponent,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import {
  CreateElementPopover,
  useCreateElementForm,
} from '@codelab/frontend-application-element/use-cases/create-element'
import { DeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import {
  CreateActionPopover,
  useCreateActionForm,
} from '@codelab/frontend-application-store/use-cases/create-action'
import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'
import { ActionsTreeView } from '@codelab/frontend-application-store/use-cases/get-actions'
import { StateTreeView } from '@codelab/frontend-application-store/use-cases/get-state'
import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import {
  CreateFieldModal,
  CreateFieldPopover,
  useCreateFieldForm,
} from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import {
  UpdateFieldModal,
  UpdateFieldPopover,
} from '@codelab/frontend-application-type/use-cases/update-field'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { IPageKind } from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementTreeView } from './builder-tree/ElementTreeView'

export const BuilderPrimarySidebar = observer<{
  isLoading?: boolean
  containerNode: IComponentModel | IPageModel
}>(({ containerNode, isLoading = false }) => {
  const { elementDomainService } = useDomainStore()
  const { builderService, rendererService } = useApplicationStore()
  const createActionForm = useCreateActionForm()
  const createFieldForm = useCreateFieldForm()
  const selectedNode = builderService.selectedNode?.current
  const createElementForm = useCreateElementForm()
  const { popover } = useCui()
  const store = containerNode.store.maybeCurrent
  const renderer = rendererService.activeRenderer?.current
  const runtimeContainerNode = renderer?.runtimeContainerNode
  const runtimeStore = runtimeContainerNode?.runtimeStore
  const runtimeProviderStore = runtimeStore?.runtimeProviderStore?.current
  const antdTree = runtimeContainerNode?.runtimeRootElement.treeViewNode

  const sidebarViews: Array<CuiSidebarView> = [
    {
      content: antdTree && <ElementTreeView treeData={antdTree} />,
      isLoading: isLoading || !containerNode,
      key: 'ElementTree',
      label: 'Elements Tree',
      toolbar: {
        items: [
          {
            cuiKey: UiKey.CreateElementToolbarItem,
            icon: <PlusOutlined />,
            onClick: () => {
              const selectedElement = selectedNode?.treeViewNode.element
                ? elementDomainService.elements.get(
                    selectedNode.treeViewNode.element.id,
                  )
                : undefined

              createElementForm.open({
                elementOptions: containerNode.elements.map(mapElementOption),
                elementTree: containerNode,
                selectedElement,
              })
              popover.open(UiKey.CreateElementPopover)
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
            cuiKey: UiKey.CreateFieldToolbarItem,
            // Added this for some cases where data is not loaded, and we cannot perform action, mainly in Cypress
            icon: <PlusOutlined disabled={!store} />,
            onClick: () => {
              if (!store) {
                return null
              }

              if (store.api.id) {
                createFieldForm.open(
                  typeRef<IInterfaceTypeModel>(store.api.id).current,
                )
                popover.open(UiKey.CreateFieldPopover)
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
            cuiKey: UiKey.CreateActionToolbarItem,
            // Added this for some cases where data is not loaded, and we cannot perform action, mainly in Cypress
            icon: <PlusOutlined disabled={!store} />,
            onClick: () => {
              if (!store) {
                return
              }

              createActionForm.open(store)
              popover.open(UiKey.CreateActionPopover)
            },
            title: 'Add Action',
          },
        ],
        title: 'Actions Toolbar',
      },
    },
    {
      content: runtimeStore && (
        <Collapse ghost size="small">
          <Collapse.Panel header="Local Store" key="localStore">
            <CodeMirrorEditor
              className="mt-1"
              editable={false}
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              singleLine={false}
              title="Local Store"
              value={runtimeStore.jsonString}
            />
          </Collapse.Panel>
          {isComponent(containerNode) ? (
            <Collapse.Panel header="Component Store" key="componentStore">
              <CodeMirrorEditor
                className="mt-1"
                editable={false}
                language={CodeMirrorLanguage.Json}
                onChange={() => undefined}
                singleLine={false}
                title="Component Store"
                value={runtimeStore.jsonString}
              />
            </Collapse.Panel>
          ) : (
            ''
          )}

          {runtimeProviderStore &&
          isPage(containerNode) &&
          containerNode.kind === IPageKind.Regular ? (
            <Collapse.Panel header="Root Store" key="rootStore">
              <CodeMirrorEditor
                className="mt-1"
                editable={false}
                language={CodeMirrorLanguage.Json}
                onChange={() => undefined}
                singleLine={false}
                title="Root Store"
                value={runtimeProviderStore.jsonString}
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
            <CreateElementPopover selectedNode={selectedNode} />
            <CreateActionPopover />
            <UpdateActionPopover />
          </>
        }
        uiKey={UiKey.BuilderSidebar}
        views={sidebarViews}
      />
      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
      <DeleteComponentModal />
      <DeleteElementModal
        selectPreviousElementOnDelete={
          builderService.selectPreviousElementOnDelete
        }
      />
      <DeleteActionModal />
    </>
  )
})

BuilderPrimarySidebar.displayName = 'BuilderMainPane'
