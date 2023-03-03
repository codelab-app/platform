import { CodeSandboxOutlined, EditOutlined } from '@ant-design/icons'
import type { IElementTree, IRenderer } from '@codelab/frontend/abstract/core'
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
import { useStore } from '@codelab/frontend/presenter/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { TabsProps } from 'antd'
import { Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { renderStickyTabBar } from '../stickyTabBarRenderer'
import { ConfigPaneComponentTabContainer } from './ConfigPane-ComponentTabContainer'
import { ConfigPaneInspectorTabContainer } from './ConfigPane-InspectorTabContainer'
import { TabContainer } from './ConfigPane-InspectorTabContainer/ConfigPane-InspectorTabContainerStyle'

interface MetaPaneProps {
  elementTree: Maybe<IElementTree>
  renderService: Maybe<IRenderer>
}

export const ConfigPane = observer<MetaPaneProps>(
  ({ renderService, elementTree }) => {
    const { builderService, elementService, componentService } = useStore()
    const selectedNode = builderService.selectedNode

    const tabItems: TabsProps['items'] = [
      {
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
                        renderer={renderService}
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
            elementTree={elementTree}
            renderService={renderService}
          />
        ),
        key: 'inspector',
        label: (
          <div>
            <EditOutlined />
            Inspector
          </div>
        ),
      },
      {
        children: <ConfigPaneComponentTabContainer />,
        key: 'component-tab',
        label: (
          <div>
            <CodeSandboxOutlined />
            Component
          </div>
        ),
      },
    ]

    return (
      <TabContainer>
        <Tabs
          defaultActiveKey={selectedNode?.id + '_tab2'}
          items={tabItems}
          renderTabBar={renderStickyTabBar}
          size="small"
        />
      </TabContainer>
    )
  },
)

ConfigPane.displayName = 'MetaPane'
