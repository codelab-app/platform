import { CodeSandboxOutlined, EditOutlined } from '@ant-design/icons'
import type {
  IActionService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
} from '@codelab/frontend/abstract/core'
import { UpdateComponentForm } from '@codelab/frontend/domain/component'
import {
  DeleteElementButton,
  MoveElementForm,
  UpdateElementForm,
} from '@codelab/frontend/domain/element'
import { Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../hooks'
import { ConfigPaneComponentTabContainer } from './ConfigPane-ComponentTabContainer'
import { ConfigPaneInspectorTabContainer } from './ConfigPane-InspectorTabContainer'
import { TabContainer } from './ConfigPane-InspectorTabContainer/ConfigPane-InspectorTabContainerStyle'

interface MetaPaneProps {
  elementTree?: IElementTree
  renderService?: IRenderer
  atomService: IAtomService
  typeService: ITypeService
  builderService: IBuilderService
  elementService: IElementService
  componentService: IComponentService
  actionService: IActionService
  userService: IUserService
  pageId: string
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
    pageId,
  }) => {
    const { providePropCompletion } = usePropCompletion(renderService)
    const selectedNode = builderService.selectedNode

    const tabItems = [
      {
        label: (
          <div>
            <EditOutlined />
            Inspector
          </div>
        ),
        key: 'inspector',
        children: (
          <ConfigPaneInspectorTabContainer
            UpdateElementContent={observer(({ node, trackPromises }) => {
              if (!elementTree) {
                return <Spin />
              }

              // The builder tree nodes could be a component as well, in which case we would show the form for components
              return (
                <>
                  {node.__nodeType === ELEMENT_NODE_TYPE ? (
                    <>
                      <UpdateElementForm
                        element={node}
                        elementService={elementService}
                        key={node.id + '_update_form'}
                        pageId={pageId}
                        providePropCompletion={(value) =>
                          providePropCompletion(value, node.id)
                        }
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
                        css={tw`my-3`}
                        disabled={node.isRoot}
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
        ),
      },
      {
        label: (
          <div>
            <CodeSandboxOutlined />
            Component
          </div>
        ),
        key: 'component',
        children: <ConfigPaneComponentTabContainer />,
      },
    ]

    return (
      <TabContainer>
        <Tabs
          defaultActiveKey={selectedNode?.id + '_tab2'}
          items={tabItems}
          size="small"
        />
      </TabContainer>
    )
  },
)

ConfigPane.displayName = 'MetaPane'
