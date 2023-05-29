import {
  AppstoreOutlined,
  BuildOutlined,
  CloudServerOutlined,
  CodeSandboxOutlined,
  ExpandOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation//codelab-ui'
import type { Nullish } from '@codelab/shared/abstract/types'
import React from 'react'

export const appMenuItem: NavigationBarItem = {
  icon: <AppstoreOutlined title="Apps" />,
  key: PageType.AppList,
  link: {
    href: PageType.AppList,
  },
  title: 'Apps',
}

export const resourceMenuItem: NavigationBarItem = {
  icon: <CloudServerOutlined title="Resources" />,
  key: PageType.Resources,
  link: {
    href: PageType.Resources,
  },
  title: 'Resources',
}

export const componentMenuItem: NavigationBarItem = {
  icon: <ExpandOutlined title="Resources" />,
  key: PageType.Components,
  link: {
    href: PageType.Components,
  },
  title: 'Resources',
}

export const allPagesMenuItem = (
  appId: Nullish<string>,
  pageId: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appId,
  icon: <FileOutlined title="Pages" />,
  key: ExplorerPaneType.PageList,
  link: {
    href: {
      pathname: PageType.PageBuilder,
      query: { appId, pageId, primarySidebarKey: ExplorerPaneType.PageList },
    },
  },
  title: 'Pages',
})

export const builderComponentsMenuItem = (
  appId: Nullish<string>,
  pageId: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appId || !pageId,
  icon: <CodeSandboxOutlined title="Builder Components" />,
  key: 'components',
  link: {
    href: {
      pathname: PageType.PageBuilder,
      query: { appId, pageId, primarySidebarKey: ExplorerPaneType.Components },
    },
  },
  title: 'Builder Components',
})

export const pageBuilderMenuItem = (
  appId: Nullish<string>,
  pageId: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appId || !pageId,
  icon: <BuildOutlined title="Builder" />,
  key: ExplorerPaneType.Explorer,
  link: {
    href: {
      pathname: PageType.PageBuilder,
      query: { appId, pageId, primarySidebarKey: ExplorerPaneType.Explorer },
    },
  },
  title: 'Builder',
})

export const commonMenuItems: Array<NavigationBarItem> = [
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
