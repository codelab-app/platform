import type { BuilderContextParams } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import BuildOutlined from '@ant-design/icons/BuildOutlined'
import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'

export const pageBuilderMenuItem = ({
  appId,
  componentId,
  pageId,
}: Partial<BuilderContextParams>): NavigationBarItem => {
  const disabledBuilderMenuItem = {
    disabled: true,
    icon: <BuildOutlined title="Builder" />,
    key: ExplorerPaneType.Explorer,
    link: undefined,
    title: 'Builder',
  }

  if (appId && pageId) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: NewRoutePaths.Page.builder({ appId, pageId }),
      },
    }
  }

  if (componentId) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: NewRoutePaths.Component.builder({ componentId }),
      },
    }
  }

  return disabledBuilderMenuItem
}
