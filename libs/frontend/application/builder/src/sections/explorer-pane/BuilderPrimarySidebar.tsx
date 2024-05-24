import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  elementTreeRef,
  isComponent,
  storeRef,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import {
  useCurrentComponent,
  useCurrentPage,
} from '@codelab/frontend/presentation/container'
import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { DeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'
import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'
import { ActionsTreeView } from '@codelab/frontend-application-store/use-cases/get-actions'
import { StateTreeView } from '@codelab/frontend-application-store/use-cases/get-state'
import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import {
  CreateFieldModal,
  CreateFieldPopover,
} from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import {
  UpdateFieldModal,
  UpdateFieldPopover,
} from '@codelab/frontend-application-type/use-cases/update-field'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Collapse } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementTreeView } from './builder-tree/ElementTreeView'

export const BuilderPrimarySidebar = observer<{ isLoading?: boolean }>(
  ({ isLoading = true }) => {
    const {
      actionService,
      builderService,
      elementService,
      fieldService,
      rendererService,
    } = useStore()

    const { popover } = useCui()
    const page = useCurrentPage()
    const component = useCurrentComponent()
    const containerNode = page ?? component
    const store = containerNode?.store.maybeCurrent
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
              cuiKey: MODEL_ACTION.CreateElement.key,
              icon: <PlusOutlined />,
              onClick: () => {
                if (!containerNode) {
                  return
                }

                const selectedElementId = builderService.selectedNode?.id

                const selectedElement = selectedElementId
                  ? elementRef(selectedElementId)
                  : undefined

                elementService.createForm.open({
                  elementOptions: containerNode.elements.map(mapElementOption),
                  elementTree: elementTreeRef(containerNode.id),
                  selectedElement,
                })
                popover.open(MODEL_ACTION.CreateElement.key)
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
              cuiKey: MODEL_ACTION.CreateField.key,
              // Added this for some cases where data is not loaded, and we cannot perform action, mainly in Cypress
              icon: <PlusOutlined disabled={!store} />,
              onClick: () => {
                if (!store) {
                  return null
                }

                const form = fieldService.createForm

                if (store.api.id) {
                  form.open(typeRef(store.api.id) as Ref<IInterfaceTypeModel>)
                  popover.open(MODEL_ACTION.CreateField.key)
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
              cuiKey: MODEL_ACTION.CreateAction.key,
              // Added this for some cases where data is not loaded, and we cannot perform action, mainly in Cypress
              icon: <PlusOutlined disabled={!store} />,
              onClick: () => {
                if (!store) {
                  return
                }

                actionService.createForm.open(storeRef(store))
                popover.open(MODEL_ACTION.CreateAction.key)
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
            {containerNode && isComponent(containerNode) ? (
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
            {runtimeProviderStore && page?.kind === IPageKind.Regular ? (
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
              <CreateElementPopover />
              <CreateActionPopover />
              <UpdateActionPopover />
            </>
          }
          uiKey={MODEL_UI.SidebarBuilder.key}
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
