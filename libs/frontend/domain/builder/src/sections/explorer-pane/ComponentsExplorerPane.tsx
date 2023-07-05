import { DeleteComponentModal } from '@codelab/frontend/domain/component'
import { DeleteElementModal } from '@codelab/frontend/domain/element'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { css } from 'styled-components'
import { renderStickyTabBar } from '../StickyTabBarRenderer'
import { CustomComponents, PreBuiltComponents } from './tab-contents'

interface ComponentsExplorerPaneProps {
  isLoading: boolean
}

export const ComponentsExplorerPane = observer<ComponentsExplorerPaneProps>(
  ({ isLoading }) => {
    console.log('ComponentsExplorerPane')

    const tabItems: TabsProps['items'] = [
      {
        children: (
          <SkeletonWrapper isLoading={isLoading}>
            <PreBuiltComponents />
          </SkeletonWrapper>
        ),
        key: 'pre-built-components',
        label: 'Pre-built Components',
      },
      {
        children: (
          <SkeletonWrapper isLoading={isLoading}>
            <CustomComponents />
          </SkeletonWrapper>
        ),
        key: 'custom-components',
        label: 'Custom Components',
      },
    ]

    return (
      <>
        <Tabs
          className="[&_.ant-page-header-heading]:px-0! [&_.ant-page-header-heading]:mt-0! h-full w-full px-4"
          css={css`
            .ant-page-header-content,
            .ant-collapse-header,
            .ant-tabs-tabpane {
              height: 100%;
            }
            .ant-tabs-content-holder {
              display: flex;
            }
          `}
          defaultActiveKey="1"
          destroyInactiveTabPane
          items={tabItems}
          renderTabBar={renderStickyTabBar}
          size="small"
        />
        <DeleteElementModal />
        <DeleteComponentModal />
        <CreateFieldModal />
        <UpdateFieldModal />
        <DeleteFieldModal />
      </>
    )
  },
)

ComponentsExplorerPane.displayName = 'ComponentsExplorerPane'
