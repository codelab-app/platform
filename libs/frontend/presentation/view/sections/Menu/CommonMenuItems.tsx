import {
  AppstoreOutlined,
  BuildOutlined,
  CloudServerOutlined,
  CodeSandboxOutlined,
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

export const allPagesMenuItem = (
  appSlug: Nullish<string>,
  pageSlug: Nullish<string>,
  componentSlug: Nullish<string>,
  userName: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appSlug,
  icon: <FileOutlined title="Pages" />,
  key: ExplorerPaneType.PageList,
  link: {
    href: {
      pathname: pageSlug ? PageType.PageBuilder : PageType.ComponentBuilder,
      query: {
        appSlug,
        ...(componentSlug ? { componentSlug } : null),
        ...(pageSlug ? { pageSlug } : null),
        primarySidebarKey: ExplorerPaneType.PageList,
        userName,
      },
    },
  },
  title: 'Pages',
})

export const builderComponentsMenuItem = (
  appSlug: Nullish<string>,
  pageSlug: Nullish<string>,
  componentSlug: Nullish<string>,
  userName: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appSlug || (!pageSlug && !componentSlug),
  icon: <CodeSandboxOutlined title="Builder Components" />,
  key: 'components',
  link: {
    href: {
      pathname: pageSlug ? PageType.PageBuilder : PageType.ComponentBuilder,
      query: {
        appSlug,
        ...(componentSlug ? { componentSlug } : null),
        ...(pageSlug ? { pageSlug } : null),
        primarySidebarKey: ExplorerPaneType.Components,
        userName,
      },
    },
  },
  title: 'Builder Components',
})

export const pageBuilderMenuItem = (
  appSlug: Nullish<string>,
  pageSlug: Nullish<string>,
  componentSlug: Nullish<string>,
  userName: Nullish<string>,
): NavigationBarItem => ({
  disabled: !appSlug || (!pageSlug && !componentSlug),
  icon: <BuildOutlined title="Builder" />,
  key: ExplorerPaneType.Explorer,
  link: {
    href: {
      pathname: pageSlug ? PageType.PageBuilder : PageType.ComponentBuilder,
      query: {
        appSlug,
        ...(componentSlug ? { componentSlug } : null),
        ...(pageSlug ? { pageSlug } : null),
        primarySidebarKey: ExplorerPaneType.Explorer,
        userName,
      },
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
