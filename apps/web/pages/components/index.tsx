import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PaneMainComponent } from '@codelab/modules/component'
import { NextPageLayout } from 'apps/web/src/layout/Layout.d'
import { LayoutComponentDetail } from 'apps/web/src/layout/Layout--componentDetail'
import React from 'react'

const ComponentList: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" style={{ position: 'relative' }}>
      {/* <h1>Component: {component?.label}</h1> */}
      {/* <ComponentRenderer component={component} /> */}
    </div>
  )
}

ComponentList.Layout = LayoutComponentDetail
ComponentList.MainPane = PaneMainComponent

export const getServerSideProps = withPageAuthRequired()

export default ComponentList
