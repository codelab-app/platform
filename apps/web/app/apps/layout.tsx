'use client'

import { DashboardTemplateConfigPane } from '@codelab/frontend-presentation-view/templates/Dashboard/DashboardTemplateConfigPane'
import ResizeHandle from '@codelab/frontend-presentation-view/templates/Dashboard/ResizeHandle'
import { Layout } from 'antd'
import type { NextPage } from 'next'
import React from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'

const DashboardLayout = ({
  children,
  header,
  navigationSidebar,
}: // configPane,
// primarySidebar,
{
  children: React.ReactNode
  header: React.ReactNode
  // configPane?: React.ReactNode
  // primarySidebar?: React.ReactNode
  navigationSidebar: React.ReactNode
}) => {
  return (
    <Layout className="max-h-full !min-h-full">
      {header}
      <Layout hasSider>
        {navigationSidebar}
        {/* Content styles */}
        <Layout>
          <PanelGroup direction="horizontal">
            {/* Primary sidebar */}
            {/* {primarySidebar && (
              <>
                <Panel defaultSize={20} order={1}>
                  <div
                    className="size-full"
                    data-cy="temp-primary-panel-wrapper"
                  >
                    {primarySidebar}
                  </div>
                </Panel>
                <ResizeHandle />
              </>
            )} */}

            {/* Primary content */}
            <Panel defaultSize={60} order={2}>
              <main className="mt-3 size-full overflow-auto px-3 pb-6">
                {children}
              </main>
            </Panel>

            {/* {configPane && (
              <>
                <ResizeHandle />
                <Panel defaultSize={20} order={3}>
                  <div className="size-full overflow-y-auto bg-white">
                    {configPane}
                  </div>
                </Panel>
              </>
            )} */}
          </PanelGroup>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
