import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { PageType } from '@codelab/frontend/model/state/router'
import { MainPaneLibrary } from '@codelab/frontend/modules/library'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Breadcrumb } from 'antd'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

const LibraryContent = () => {
  // const { selectedComponent, setSelected } = useComponentBuilder()

  // if (!selectedComponent) {
  //   return null
  // }

  // const cy = CytoscapeService.fromComponent(selectedComponent)
  // const root = CytoscapeService.componentTree(cy)

  return (
    <>
      {/* {root.children?.length ? (*/}
      {/*  <ComponentRenderer component={selectedComponent} />*/}
      {/* ) : (*/}
      {/*  <Empty*/}
      {/*    description={*/}
      {/*      <span>Your component is empty, please add a component element</span>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <CreateComponentElementButton />*/}
      {/*  </Empty>*/}
      {/* )}*/}
      {/* <CreateComponentElementModal componentId={selectedComponent.id} /> */}
    </>
  )
}

const Library: CodelabPage = () => {
  return (
    <div id="Builder" css={tw`relative h-full`}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href={{ pathname: PageType.AppList }}>Apps</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={{ pathname: PageType.LibraryList }}>Libraries</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <LibraryContent />
    </div>
  )
}

Library.Template = DashboardTemplate
Library.MainPane = MainPaneLibrary
Library.Header = null
Library.MetaPane = null
Library.SidebarNavigation = null

export const getServerSideProps = withPageAuthRequired()

export default Library
