import {
  AppstoreOutlined,
  CloudServerOutlined,
  ClusterOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { MenuProps } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import Link from 'next/link'
import React from 'react'

export const appMenuItem: ItemType = {
  icon: <AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />,
  key: PageType.AppList,
  label: <Link href={PageType.AppList}>Apps</Link>,
}

export const storeMenuItem: ItemType = {
  icon: <ClusterOutlined title="Stores" />,
  key: PageType.Store,
  label: <Link href={PageType.Store}>Stores</Link>,
}

export const resourceMenuItem: ItemType = {
  icon: (
    <CloudServerOutlined data-testid="resource-tab-trigger" title="Resources" />
  ),
  key: PageType.Resource,
  label: <Link href={PageType.Resource}>Resources</Link>,
}

export const commonMenuItems: MenuProps['items'] = [
  appMenuItem,
  // {
  //   icon: <TagOutlined data-testid="tag-tab-trigger" title="Tags" />,
  //   key: PageType.Tag,
  //   label: <Link href={PageType.Tag}>Tags</Link>,
  // },
  // {
  //   icon: <FunctionOutlined title="Lambdas" />,
  //   key: PageType.LambdaList,
  //   label: <Link href={PageType.LambdaList}>Lambdas</Link>,
  // },
  // {
  //   icon: <BuildOutlined title="Components" />,
  //   key: PageType.ComponentList,
  //   label: <Link href={PageType.ComponentList}>Components</Link>,
  // },
]
