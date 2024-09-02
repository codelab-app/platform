import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import CloudServerOutlined from '@ant-design/icons/CloudServerOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import SafetyOutlined from '@ant-design/icons/SafetyOutlined'
import {
  type ComponentContextParams,
  ExplorerPaneType,
  type PageContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { RequiredPartial } from '@codelab/shared/utils'
import React from 'react'

export const appMenuItem: NavigationBarItem = {
  icon: <AppstoreOutlined title="Apps" />,
  key: PageType.AppList(),
  link: {
    href: PageType.AppList(),
  },
  title: 'Apps',
}

export const resourceMenuItem: NavigationBarItem = {
  icon: <CloudServerOutlined title="Resources" />,
  key: PageType.Resources(),
  link: {
    href: PageType.Resources(),
  },
  title: 'Resources',
}

export const authGuardMenuItem: NavigationBarItem = {
  icon: <SafetyOutlined title="Auth Guards" />,
  key: PageType.AuthGuards(),
  link: {
    href: PageType.AuthGuards(),
  },
  title: 'Auth Guards',
}

export const builderComponentsMenuItem = ({
  appId,
  componentId,
  pageId,
}: RequiredPartial<
  ComponentContextParams & PageContextParams
>): NavigationBarItem => {
  const disabledBuilderComponentsMenuItem = {
    disabled: true,
    icon: <CodeSandboxOutlined title="Builder Components" />,
    key: 'components',
    link: undefined,
    title: 'Builder Components',
  }

  if (appId && pageId) {
    return {
      ...disabledBuilderComponentsMenuItem,
      disabled: false,
      link: {
        href: PageType.PageBuilder(
          { appId, pageId },
          { primarySidebarKey: ExplorerPaneType.Components },
        ),
      },
    }
  }

  if (componentId) {
    return {
      ...disabledBuilderComponentsMenuItem,
      disabled: false,
      link: {
        href: PageType.ComponentBuilder(
          { componentId },
          {
            primarySidebarKey: ExplorerPaneType.Components,
          },
        ),
      },
    }
  }

  return disabledBuilderComponentsMenuItem
}

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
