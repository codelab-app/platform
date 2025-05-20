import type { BuilderContextParams } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import CloudServerOutlined from '@ant-design/icons/CloudServerOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import SafetyOutlined from '@ant-design/icons/SafetyOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'

export const appMenuItem: NavigationBarItem = {
  icon: <AppstoreOutlined title="Apps" />,
  key: RoutePaths.App.list(),
  link: {
    href: RoutePaths.App.list(),
  },
  title: 'Apps',
}

export const resourceMenuItem: NavigationBarItem = {
  icon: <CloudServerOutlined title="Resources" />,
  key: RoutePaths.Resource.base(),
  link: {
    href: RoutePaths.Resource.base(),
  },
  title: 'Resources',
}

export const authGuardMenuItem: NavigationBarItem = {
  icon: <SafetyOutlined title="Auth Guards" />,
  key: RoutePaths.AuthGuard.base(),
  link: {
    href: RoutePaths.AuthGuard.base(),
  },
  title: 'Auth Guards',
}

export const builderComponentsMenuItem = ({
  appId,
  componentId,
  pageId,
}: Partial<BuilderContextParams>): NavigationBarItem => {
  const componentsListMenuItem = {
    icon: <CodeSandboxOutlined title="Builder Components" />,
    key: 'components',
    link: {
      href: RoutePaths.Component.base(),
    },
    title: 'Builder Components',
  }

  if (appId && pageId) {
    return {
      ...componentsListMenuItem,
      link: {
        href: RoutePaths.Page.builderComponent.list({ appId, pageId }),
      },
    }
  }

  if (componentId) {
    return {
      ...componentsListMenuItem,
      link: {
        href: RoutePaths.Component.list({ componentId }),
      },
    }
  }

  return componentsListMenuItem
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
