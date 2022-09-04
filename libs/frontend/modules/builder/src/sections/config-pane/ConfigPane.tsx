import { CodeSandboxOutlined, EditOutlined } from '@ant-design/icons'
import { UpdateComponentForm } from '@codelab/frontend/modules/component'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
} from '@codelab/frontend/modules/element'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IActionService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElement,
  IElementService,
  IElementTree,
  IRenderer,
  ITypeService,
  IUserService,
} from '@codelab/shared/abstract/core'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../hooks'
import { ConfigPaneComponentTabContainer } from './ConfigPane-ComponentTabContainer'
import { ConfigPaneInspectorTabContainer } from './ConfigPane-InspectorTabContainer'
import { TabContainer } from './ConfigPane-InspectorTabContainer/ConfigPane-InspectorTabContainerStyle'

interface MetaPaneProps {
  elementTree: IElementTree
  renderService: IRenderer
  atomService: IAtomService
  typeService: ITypeService
  builderService: IBuilderService
  elementService: IElementService
  componentService: IComponentService
  actionService: IActionService
  userService: IUserService
}

export const ConfigPane = observer<MetaPaneProps>(
  ({
    typeService,
    atomService,
    builderService,
    elementService,
    componentService,
    renderService,
    elementTree,
    actionService,
    userService,
  }) => {
    const { providePropCompletion } = usePropCompletion(renderService)
    const isRootElement = (element: IElement) => !element.parentElement
    const selectedNode = builderService.selectedNode

    if (!selectedNode) {
      return null
    }

    return (
      <TabContainer>
        <Tabs defaultActiveKey={selectedNode.id + '_tab2'} size="small">
          <Tabs.TabPane
            destroyInactiveTabPane
            key="tab1"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={
              <div>
                <EditOutlined />
                Inspector
              </div>
            }
          >
            <ConfigPaneInspectorTabContainer
              UpdateElementContent={observer(({ node, trackPromises }) => {
                /**
                 * The builder tree nodes could be a component as well, in which case we would show the form for components
                 */
                return (
                  <>
                    {node.__nodeType === ELEMENT_NODE_TYPE ? (
                      <>
                        <UpdateElementForm
                          actionService={actionService}
                          builderService={builderService}
                          element={node}
                          elementService={elementService}
                          key={node.id + '_update_form'}
                          providePropCompletion={(value) =>
                            providePropCompletion(value, node.id)
                          }
                          storeId={renderService?.appStore?.id as string}
                          trackPromises={trackPromises}
                        />
                        <MoveElementForm
                          element={node}
                          elementService={elementService}
                          elementTree={elementTree}
                          key={node.id + '_move_form'}
                          trackPromises={trackPromises}
                        />
                        <DeleteElementButton
                          css={tw`mt-3`}
                          disabled={isRootElement(node)}
                          element={node}
                          elementService={elementService}
                        />
                      </>
                    ) : null}

                    {node.__nodeType === COMPONENT_NODE_TYPE ? (
                      <UpdateComponentForm
                        component={node}
                        componentService={componentService}
                      />
                    ) : null}
                  </>
                )
              })}
              actionService={actionService}
              atomService={atomService}
              builderService={builderService}
              elementService={elementService}
              elementTree={elementTree}
              renderService={renderService}
              typeService={typeService}
              userService={userService}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            destroyInactiveTabPane
            key="tab2"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={
              <div>
                <CodeSandboxOutlined />
                Component{' '}
              </div>
            }
          >
            <ConfigPaneComponentTabContainer />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    )
  },
)

ConfigPane.displayName = 'MetaPane'
