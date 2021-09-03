import { CodelabPage } from '@codelab/frontend/abstract/props'
import React from 'react'
import { DemoRenderer } from '../../src/demo/DemoRenderer'

const DemoPage: CodelabPage = () => {
  return <DemoRenderer />
}

DemoPage.Template = null
DemoPage.MainPane = null
DemoPage.Header = null
DemoPage.SidebarNavigation = null
DemoPage.MetaPane = null

export default DemoPage
