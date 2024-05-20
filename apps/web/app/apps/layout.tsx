import 'server-only'
import {
  ResizableGroup,
  ResizablePanel,
} from '@codelab/frontend/presentation/client-components'
import { Layout } from 'antd'
import type { NextPage } from 'next'
import React from 'react'

const DashboardLayout: NextPage = async ({
  children,
  configPane,
  header,
  navigationSidebar,
  primarySidebar,
}: React.PropsWithChildren<{
  header?: React.ReactNode
  configPane?: React.ReactNode
  primarySidebar?: React.ReactNode
  navigationSidebar?: React.ReactNode
}>) => {
  return (
    <Layout className="max-h-full !min-h-full">
      {header}
      <Layout hasSider>
        {navigationSidebar}
        <Layout>
          <ResizableGroup>
            {primarySidebar}
            <ResizablePanel defaultSize={60} order={2}>
              <main className="mt-3 size-full overflow-auto px-3 pb-6">
                {children}
              </main>
            </ResizablePanel>
            {configPane}
          </ResizableGroup>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
