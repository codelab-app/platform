import type { BuilderContextParams } from '@codelab/frontend-abstract-application'
import type { NavigationBarItem } from '@codelab/frontend-presentation-codelab-ui'

import BuildOutlined from '@ant-design/icons/BuildOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'

export const pageBuilderMenuItem = ({
  appId,
  componentId,
  pageId,
}: Partial<BuilderContextParams>): NavigationBarItem => {
  const disabledBuilderMenuItem = {
    disabled: true,
    icon: <BuildOutlined title="Builder" />,
    key: 'builder',
    link: undefined,
    title: 'Builder',
  }

  if (appId && pageId) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: RoutePaths.Page.builder({ appId, pageId }),
      },
    }
  }

  if (componentId) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: RoutePaths.Component.list({ componentId }),
      },
    }
  }

  return disabledBuilderMenuItem
}
