import {
  AppstoreOutlined,
  BuildOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { Nullish } from '@codelab/shared/abstract/types'
import { MenuProps } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import Link from 'next/link'
import React from 'react'

export const appMenuItem: ItemType = {
  icon: <AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />,
  key: PageType.AppList,
  label: <Link href={PageType.AppList}>Apps</Link>,
}

export const storeMenuItem = (appId: Nullish<string>): ItemType => ({
  icon: <DatabaseOutlined data-testid="store-tab-trigger" title="Store" />,
  key: PageType.Store,
  disabled: !appId,
  label: (
    <Link href={{ pathname: PageType.Store, query: { appId } }}>Store</Link>
  ),
})

export const resourceMenuItem: ItemType = {
  icon: (
    <CloudServerOutlined data-testid="resource-tab-trigger" title="Resources" />
  ),
  key: PageType.Resource,
  label: <Link href={PageType.Resource}>Resources</Link>,
}

export const allPagesMenuItem = (appId: Nullish<string>): ItemType => ({
  icon: <FileOutlined data-testid="pages-tab-trigger" title="Pages" />,
  key: PageType.PageList,
  disabled: !appId,
  label: (
    <Link href={{ pathname: PageType.PageList, query: { appId } }}>Pages</Link>
  ),
})

export const pageBuilderMenuItem = (
  appId: Nullish<string>,
  pageId: Nullish<string>,
): ItemType => ({
  icon: <BuildOutlined data-testid="builder-tab-trigger" title="Builder" />,
  key: PageType.PageBuilder,
  disabled: !appId || !pageId,
  label: (
    <Link href={{ pathname: PageType.PageBuilder, query: { appId, pageId } }}>
      Builder
    </Link>
  ),
})

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
