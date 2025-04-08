'use client'

import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { type IBuilderRoute } from '@codelab/frontend/abstract/application'
import { isComponent, isPage } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useActionService } from '@codelab/frontend-application-store/services'
import { ActionsTreeView } from '@codelab/frontend-application-store/use-cases/get-actions'
import { StateTreeView } from '@codelab/frontend-application-store/use-cases/get-state'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { IPageKind } from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gqlgen'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { mergeDeep } from 'remeda'

import { ElementTreeView } from '../../builder-tree/ElementTreeView'

interface BuilderPrimarySidebarProps {
  containerNode: IComponentModel | IPageModel
  context: IBuilderRoute
  isLoading?: boolean
}

/**
 * Can be re-used for both `page` and `component` builder
 */
export const BaseBuilderPrimarySidebar = observer<BuilderPrimarySidebarProps>(
  ({ containerNode, context, isLoading = false }) => {
    const { rendererService } = useApplicationStore()
    const router = useRouter()
    const { createPopover: createElementPopover } = useElementService()
    const { createPopover: createFieldPopover } = useFieldService()
    const { createPopover: createActionPopover } = useActionService()
    const store = containerNode.store.maybeCurrent
    const renderer = rendererService.activeRenderer?.current
    const runtimeContainerNode = renderer?.runtimeContainerNode
    const runtimeStore = runtimeContainerNode?.runtimeStore
    const runtimeProviderStore = runtimeStore?.runtimeProviderStore?.current
    const antdTree = runtimeContainerNode?.runtimeRootElement.treeViewNode

    const sidebarViews: Array<CuiSidebarView> = [
      {
        content: (
          <ElementTreeView
            containerNode={containerNode}
            context={context}
            treeData={antdTree}
          />
        ),
        isLoading: isLoading || !containerNode,
        key: 'ElementTree',
        label: 'Elements Tree',
        toolbar: {
          items: [
            {
              cuiKey: UiKey.ElementToolbarItemCreate,
              icon: <PlusOutlined />,
              onClick: () => {
                return createElementPopover.open(router, context)
              },
              title: 'Add Element',
            },
          ],
          title: 'Element Tree Toolbar',
        },
      },
      {
        content: store && (
          <StateTreeView
            context={{
              add: ({ interfaceId }) =>
                mergeDeep(context, {
                  params: {
                    interfaceId,
                  },
                }),
              update: ({ fieldId }) =>
                mergeDeep(context, {
                  params: {
                    fieldId,
                  },
                }),
            }}
            store={store}
          />
        ),
        isLoading: isLoading || !store,
        key: 'StateList',
        label: 'State',
        toolbar: {
          items: [
            {
              cuiKey: UiKey.FieldToolbarItemCreate,
              // Added this for some cases where data is not loaded, and we cannot perform action, mainly in E2e
              icon: <PlusOutlined disabled={!store} />,
              onClick: () => {
                if (!store) {
                  return null
                }

                if (store.api.id) {
                  createFieldPopover.open(
                    router,
                    mergeDeep(context, {
                      params: {
                        interfaceId: store.api.id,
                      },
                    }),
                  )
                }
              },
              title: 'Add Field',
            },
          ],
          title: 'State Toolbar',
        },
      },
      {
        content: store && <ActionsTreeView context={context} store={store} />,
        isLoading: isLoading || !store,
        key: 'Actions',
        label: 'Actions',
        toolbar: {
          items: [
            {
              cuiKey: UiKey.ActionToolbarItemCreate,
              // Added this for some cases where data is not loaded, and we cannot perform action, mainly in E2e
              icon: <PlusOutlined disabled={!store} />,
              onClick: () => {
                if (!store) {
                  return
                }

                createActionPopover.open(
                  router,
                  mergeDeep(context, {
                    params: {
                      storeId: store.id,
                    },
                  }),
                )
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
      <CuiSidebar
        defaultActiveViewKeys={['ElementTree']}
        label="Explorer"
        uiKey={UiKey.BuilderSidebar}
        views={sidebarViews}
      />
    )
  },
)

BaseBuilderPrimarySidebar.displayName = 'BuilderMainPane'
