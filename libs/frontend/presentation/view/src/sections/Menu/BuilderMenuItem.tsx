import type { BuilderContextParams } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import BuildOutlined from '@ant-design/icons/BuildOutlined'
import {
  PageType,
  PrimarySidebar,
} from '@codelab/frontend/abstract/application'
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
        href: PageType.PageBuilder(
          { appId, pageId },
          PrimarySidebar.ElementTree,
        ),
      },
    }
  }

  if (componentId) {
    return {
      ...disabledBuilderMenuItem,
      disabled: false,
      link: {
        href: PageType.ComponentBuilder({ componentId }),
      },
    }
  }

  return disabledBuilderMenuItem
}
