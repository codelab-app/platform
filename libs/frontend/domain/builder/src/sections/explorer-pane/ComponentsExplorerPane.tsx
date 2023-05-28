import { DeleteComponentModal } from '@codelab/frontend/domain/component'
import { DeleteElementModal } from '@codelab/frontend/domain/element'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { css } from '@emotion/react'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
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
          css={css`
            ${tw`px-4 h-full w-full`}
            .ant-page-header-content,
            .ant-collapse-header,
            .ant-page-header-heading {
              ${tw`px-0! mt-0!`}
            }

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
