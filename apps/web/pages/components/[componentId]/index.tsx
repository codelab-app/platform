import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { ComponentContext } from '@codelab/frontend/shared'
import { PaneConfigComponentElement } from '@codelab/modules/component-element'
import { Empty, Tabs } from 'antd'
import { LayoutComponentDetail } from 'apps/web/src/layout/Layout--componentDetail'
import { TabsLayout } from 'apps/web/src/layout/Layout-pane'
import React, { useContext } from 'react'
import { NextPageLayout } from '../../../src/layout/Layout.d'

const ComponentDetail: NextPageLayout<'builder'> = () => {
  const { component } = useContext(ComponentContext)

  if (!component) {
    return <Empty />
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <h1>Component: {component?.label}</h1>
      {/* <ComponentRenderer component={component} /> */}
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

const ComponentDetailMainPane = (props: { componentElementId: string }) => {
  const {
    selectionState: { selectedElement },
  } = useBuilderSelectionState()

  if (!selectedElement) {
    return <></>
  }

  return (
    <TabsLayout>
      <Tabs.TabPane tab="Inspector" key="1" style={{ height: '100%' }}>
        <PaneConfigComponentElement componentElementId={selectedElement} />
      </Tabs.TabPane>
    </TabsLayout>
  )
}

ComponentDetail.Layout = LayoutComponentDetail
ComponentDetail.MainPane = ComponentDetailMainPane

export default ComponentDetail
