import { CodelabPage } from '@codelab/frontend/abstract/props'
import { DemoRenderer } from 'apps/web/src/demo/DemoRenderer'
import React from 'react'

const DemoPage: CodelabPage = () => {
  return <DemoRenderer />
}

DemoPage.Template = null
DemoPage.MainPane = null
DemoPage.Header = null
DemoPage.SidebarNavigation = null
DemoPage.MetaPane = null

export default DemoPage
