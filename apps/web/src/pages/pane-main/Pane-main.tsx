import React from 'react'
import { Tabs } from 'antd'
import { Page } from '@codelab/frontend/shared'
import { PaneMainStyle } from '@codelab/modules/style'
import { PanePage } from '@codelab/modules/page'
import { PaneMainComponent } from '@codelab/modules/component'
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

const { TabPane } = Tabs

export const PaneMain = () => {
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
      <TabPane tab={<CopyOutlined title="Pages" />} key="1">
        <PanePage />
      </TabPane>
      <TabPane tab={<PlusSquareOutlined title="Components" />} key="2">
        <PaneMainComponent />
      </TabPane>
      <TabPane tab={<ApartmentOutlined title="Tree" />} key="3">
        <PaneMainTree />
      </TabPane>
      <TabPane tab={<FormatPainterOutlined title="Styles" />} key="4">
        <PaneMainStyle />
      </TabPane>
      <TabPane
        style={{ overflowX: 'auto' }}
        tab={<FunctionOutlined title="Function" />}
        key="5"
      >
        <PaneMainLambda />
      </TabPane>
      <TabPane
        tab={
          <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atom" />
        }
        key="6"
      >
        <PaneMainAtom />
      </TabPane>
      <TabPane tab={<DatabaseOutlined title="Library" />} key="7">
        <PaneMainLibrary />
      </TabPane>
    </Tabs>
  )
}
