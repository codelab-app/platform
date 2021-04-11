import React from 'react'
import { Tabs } from 'antd'
import { Page } from '@codelab/frontend/shared'
import { PaneMainStyle } from '@codelab/modules/style'
import { PanePage } from '@codelab/modules/page'
import { PaneMainComponent } from '@codelab/modules/component'
import { PaneMainLambda } from '@codelab/modules/lambda'
import { PaneMainTree } from '@codelab/modules/page'
import { PaneMainAtom } from '@codelab/modules/atom'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'

import Link from 'next/link'

const { TabPane } = Tabs

// TODO click on apps (wide of icon)
export const PaneMain = () => {
  return (
    <Tabs tabPosition="left" style={{ height: '100%' }} defaultActiveKey="2">
      <TabPane
        tab={
          <Link href={Page.APP_LIST.url}>
            <div>
              <AppstoreOutlined title="Apps" />
            </div>
          </Link>
        }
        key="1"
      >
        Apps
      </TabPane>
      <TabPane tab={<CopyOutlined title="Pages" />} key="2">
        <PanePage />
      </TabPane>
      <TabPane tab={<PlusSquareOutlined title="Components" />} key="3">
        <PaneMainComponent />
      </TabPane>
      <TabPane tab={<ApartmentOutlined title="Tree" />} key="4">
        <PaneMainTree />
      </TabPane>
      <TabPane tab={<FormatPainterOutlined title="Styles" />} key="5">
        <PaneMainStyle />
      </TabPane>
      <TabPane
        style={{ overflowX: 'auto' }}
        tab={<FunctionOutlined title="Function" />}
        key="6"
      >
        <PaneMainLambda />
      </TabPane>
      <TabPane tab={<DeploymentUnitOutlined title="Atom" />} key="7">
        <PaneMainAtom />
      </TabPane>
    </Tabs>
  )
}
