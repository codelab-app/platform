import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import { NextPageLayout } from '../../../../src/layout/Layout.d'
import { PaneMainAtom } from '@codelab/modules/atom'
import { LibraryContext } from '@codelab/frontend/shared'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'

const AtomDetail: NextPageLayout<'builder'> = () => {
  // const { component } = useContext(ComponentContext)

  // if (!component) {
  //   return <Empty />
  // }

  const { libraries } = useContext(LibraryContext)
  console.log(libraries)

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      Hi
      {/* <h1>Component: {component?.label}</h1>
      <ComponentRenderer component={component} /> */}
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

AtomDetail.Layout = LayoutBuilder
AtomDetail.MainPane = PaneMainAtom

// AtomDetail.MainPane = () => (
//   <Menu
//     style={{ height: '100%' }}
//     defaultSelectedKeys={['1']}
//     defaultOpenKeys={['sub1']}
//     mode="inline"
//   >
//     <Menu.Item key="1">Atoms</Menu.Item>
//     {/* <Menu.Item key="2">Option 2</Menu.Item> */}
//   </Menu>
// )

export default AtomDetail
