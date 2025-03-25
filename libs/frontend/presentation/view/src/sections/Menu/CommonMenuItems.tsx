import type { BuilderContextParams } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import CloudServerOutlined from '@ant-design/icons/CloudServerOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import SafetyOutlined from '@ant-design/icons/SafetyOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'

export const appMenuItem: NavigationBarItem = {
  icon: <AppstoreOutlined title="Apps" />,
  key: RoutePaths.AppList(),
  link: {
    href: RoutePaths.AppList(),
  },
  title: 'Apps',
}

export const resourceMenuItem: NavigationBarItem = {
  icon: <CloudServerOutlined title="Resources" />,
  key: RoutePaths.Resources(),
  link: {
    href: RoutePaths.Resources(),
  },
  title: 'Resources',
}

export const authGuardMenuItem: NavigationBarItem = {
  icon: <SafetyOutlined title="Auth Guards" />,
  key: RoutePaths.AuthGuards(),
  link: {
    href: RoutePaths.AuthGuards(),
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
      href: RoutePaths.Components(),
    },
    title: 'Builder Components',
  }

  if (appId && pageId) {
    return {
      ...componentsListMenuItem,
      link: {
        href: RoutePaths.PageBuilderComponentList({ appId, pageId }),
      },
    }
  }

  if (componentId) {
    return {
      ...componentsListMenuItem,
      link: {
        href: RoutePaths.ComponentBuilder({ componentId }),
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
