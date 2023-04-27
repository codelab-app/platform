import { CodeSandboxOutlined, EditOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { renderStickyTabBar } from '../stickyTabBarRenderer'
import { ConfigPaneComponentTabContainer } from './ConfigPane-ComponentTabContainer'
import { ConfigPaneInspectorTabContainer } from './ConfigPane-InspectorTabContainer'
import { TabContainer } from './ConfigPane-InspectorTabContainer/ConfigPane-InspectorTabContainerStyle'

interface ConfigPaneProps {
  isLoading?: boolean
}

export const ConfigPane = observer<ConfigPaneProps>(({ isLoading = true }) => {
  const { builderService } = useStore()
  const selectedNode = builderService.selectedNode

  const tabItems: TabsProps['items'] = [
    {
      children: (
        <SkeletonWrapper isLoading={isLoading}>
          <ConfigPaneInspectorTabContainer />
        </SkeletonWrapper>
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
      children: (
        <SkeletonWrapper isLoading={isLoading}>
          <ConfigPaneComponentTabContainer />
        </SkeletonWrapper>
      ),
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
})

ConfigPane.displayName = 'MetaPane'
