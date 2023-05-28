import { EyeOutlined } from '@ant-design/icons'
import { Sidebar } from '@codelab/frontend/presentation//codelab-ui'
import type { ComponentType } from 'react'
import React from 'react'
import tw from 'twin.macro'

export interface ExplorerPaneProps {
  ExplorerPane: ComponentType
}

export const DashboardTemplateExplorerPane = ({
  ExplorerPane,
}: ExplorerPaneProps) => {
  // ! This code is temporary for testing purposes.
  return (
    <div css={tw`w-full h-full`}>
      <Sidebar
        label="My Sidebar"
        tabs={[
          {
            icon: <EyeOutlined></EyeOutlined>,
            key: '1',
            label: 'Tab 1',
            views: [
              {
                content: <ExplorerPane />,
                key: '1',
                label: 'Explorer pane',
                toolbar: {
                  items: [
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '1',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '2',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '3',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '4',
                      title: 'Explorer pane',
                    },
                  ],
                  title: 'ExplorerPaneTitle',
                },
              },
              {
                content: <ExplorerPane />,
                key: '2',
                label: 'Explorer pane',
                toolbar: {
                  items: [
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '1',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '2',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '3',
                      title: 'Explorer pane',
                    },
                    {
                      icon: <EyeOutlined></EyeOutlined>,
                      key: '4',
                      title: 'Explorer pane',
                    },
                  ],
                  title: 'ExplorerPaneTitle',
                },
              },
            ],
          },
        ]}
        views={[
          {
            content: <ExplorerPane />,
            key: '1',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
          {
            content: <ExplorerPane />,
            key: '2',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
          {
            content: <ExplorerPane />,
            key: '3',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
          {
            content: <ExplorerPane />,
            key: '4',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
          {
            content: <ExplorerPane />,
            key: '5',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
          {
            content: <ExplorerPane />,
            key: '6',
            label: 'Explorer pane',
            toolbar: {
              items: [
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '1',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '2',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '3',
                  title: 'Explorer pane',
                },
                {
                  icon: <EyeOutlined></EyeOutlined>,
                  key: '4',
                  title: 'Explorer pane',
                },
              ],
              title: 'ExplorerPaneTitle',
            },
          },
        ]}
      />
      {/* <Sider
        css={tw`w-auto border-r border-gray-200 max-h-full h-full overflow-x-hidden overflow-y-auto overscroll-contain`}
        theme="light"
        width="auto"
      >
        <div css={tw`relative max-h-full h-full flex flex-row`}>
          <div css={tw`h-full flex-1 w-[calc(100% - 1rem)]`}>
            <ExplorerPane />
          </div>
        </div>
      </Sider> */}
    </div>
  )
}
