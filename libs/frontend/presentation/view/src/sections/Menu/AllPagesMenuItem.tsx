import type { NavigationBarItem } from '@codelab/frontend-presentation-codelab-ui'

import FileOutlined from '@ant-design/icons/FileOutlined'
import {
  type PageContextParams,
  RoutePaths,
} from '@codelab/frontend-abstract-application'

export const allPagesMenuItem = ({
  appId,
  pageId,
}: Partial<PageContextParams>): NavigationBarItem => {
  const disabledPageListItem = {
    disabled: true,
    icon: <FileOutlined title="Pages" />,
    key: 'pages',
    link: undefined,
    title: 'Pages',
  }

  if (!appId || !pageId) {
    return disabledPageListItem
  }

  return {
    ...disabledPageListItem,
    disabled: false,
    link: {
      href: RoutePaths.Page.list({
        appId,
        pageId,
      }),
    },
  }
}
