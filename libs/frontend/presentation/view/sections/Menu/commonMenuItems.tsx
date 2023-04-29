import {
  AppstoreOutlined,
  BuildOutlined,
  CloudServerOutlined,
  ExpandOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import Link from 'next/link'
import React from 'react'

export const appMenuItem: ItemType = {
  icon: <AppstoreOutlined title="Apps" />,
  key: PageType.AppList,
  label: <Link href={PageType.AppList}>Apps</Link>,
}

export const resourceMenuItem: ItemType = {
  icon: <CloudServerOutlined title="Resources" />,
  key: PageType.Resources,
  label: <Link href={PageType.Resources}>Resources</Link>,
}

export const componentMenuItem: ItemType = {
  icon: <ExpandOutlined title="Resources" />,
  key: PageType.Components,
  label: <Link href={PageType.Components}>Components</Link>,
}

export const allPagesMenuItem = (appId: Nullish<string>): ItemType => ({
  disabled: !appId,
  icon: <FileOutlined title="Pages" />,
  key: PageType.PageList,
  label: (
    <Link href={{ pathname: PageType.PageList, query: { appId } }}>Pages</Link>
  ),
})

export const pageBuilderMenuItem = (
  appId: Nullish<string>,
  pageId: Nullish<string>,
): ItemType => ({
  disabled: !appId || !pageId,
  icon: <BuildOutlined title="Builder" />,
  key: PageType.PageBuilder,
  label: (
    <Link href={{ pathname: PageType.PageBuilder, query: { appId, pageId } }}>
      Builder
    </Link>
  ),
})

export const commonMenuItems: Array<ItemType> = [
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
