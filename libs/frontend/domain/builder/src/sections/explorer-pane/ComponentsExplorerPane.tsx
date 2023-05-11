import {
  CreateComponentModal,
  DeleteComponentModal,
} from '@codelab/frontend/domain/component'
import {
  CreateElementModal,
  DeleteElementModal,
} from '@codelab/frontend/domain/element'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import { css } from '@emotion/react'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { renderStickyTabBar } from '../stickyTabBarRenderer'
import { CustomComponents, PreBuiltComponents } from './tab-contents'

export const ComponentsExplorerPane = observer(() => {
  const tabItems: TabsProps['items'] = [
    {
      children: <PreBuiltComponents />,
      key: 'pre-built-components',
      label: 'Pre-built Components',
    },
    {
      children: <CustomComponents />,
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
      <CreateElementModal />
      <DeleteElementModal />
      <CreateComponentModal />
      <DeleteComponentModal />
      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
    </>
  )
})

ComponentsExplorerPane.displayName = 'ComponentsExplorerPane'
