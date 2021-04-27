import React from 'react'
import { Tabs } from 'antd'
import { Page, PageType } from '@codelab/frontend/shared'
import { PaneMainStyle } from '@codelab/modules/style'
import { PanePage } from '@codelab/modules/page'
import {
  PaneMainComponentTree,
  PaneMainComponent,
} from '@codelab/modules/component'
import { PaneMainLambda } from '@codelab/modules/lambda'
import { PaneMainTree } from '@codelab/modules/page'
import { PaneMainAtom } from '@codelab/modules/atom'
import { PaneMainLibrary } from '@codelab/modules/library'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'

import Link from 'next/link'
import { useRouter } from 'next/router'

const { TabPane } = Tabs

export const PaneMain = () => {
  const { pathname } = useRouter()

  const pageTab = (
    <TabPane
      tab={<CopyOutlined data-testid="page-tab-trigger" title="Pages" />}
      key="1"
    >
      <PanePage />
    </TabPane>
  )

  const componentTab = (
    <TabPane
      tab={
        <PlusSquareOutlined
          data-testid="component-tab-trigger"
          title="Components"
        />
      }
      key="2"
    >
      <PaneMainComponent />
    </TabPane>
  )

  const treeTab = (
    <TabPane
      tab={<ApartmentOutlined data-testid="tree-tab-trigger" title="Tree" />}
      key="3"
    >
      <PaneMainTree />
    </TabPane>
  )

  const stylesTab = (
    <TabPane
      tab={
        <FormatPainterOutlined
          data-testid="styles-tab-trigger"
          title="Styles"
        />
      }
      key="4"
    >
      <PaneMainStyle />
    </TabPane>
  )

  const lambdaTab = (
    <TabPane
      style={{ overflowX: 'auto' }}
      tab={
        <FunctionOutlined data-testid="lambda-tab-trigger" title="Function" />
      }
      key="5"
    >
      <PaneMainLambda />
    </TabPane>
  )

  const atomTab = (
    <TabPane
      tab={
        <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atom" />
      }
      key="6"
    >
      <PaneMainAtom />
    </TabPane>
  )

  const libraryTab = (
    <TabPane
      tab={
        <DatabaseOutlined data-testid="library-tab-trigger" title="Library" />
      }
      key="7"
    >
      <PaneMainLibrary />
    </TabPane>
  )

  const componentTreeTab = (
    <TabPane
      tab={
        <ApartmentOutlined
          data-testid="component-tree-tab-trigger"
          title="Tree"
        />
      }
      key="8"
    >
      <PaneMainComponentTree />
    </TabPane>
  )

  return (
    <Tabs
      tabPosition="left"
      style={{ height: '100%' }}
      defaultActiveKey="1"
      tabBarExtraContent={{
        left: (
          <div
            style={{
              margin: '0 0 16px 0',
              padding: '8px 24px',
            }}
          >
            <Link href={Page.APP_LIST.url}>
              <AppstoreOutlined title="Apps" style={{ marginRight: '12px' }} />
            </Link>
          </div>
        ),
      }}
    >
      {pathname === PageType.ComponentDetail ? (
        <>
          {componentTreeTab}
          {stylesTab}
          {atomTab}
          {libraryTab}
        </>
      ) : (
        <>
          {pageTab}
          {componentTab}
          {treeTab}
          {stylesTab}
          {lambdaTab}
          {atomTab}
          {libraryTab}
        </>
      )}
    </Tabs>
  )
}
