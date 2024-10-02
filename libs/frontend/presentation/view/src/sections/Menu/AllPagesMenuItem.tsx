import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import FileOutlined from '@ant-design/icons/FileOutlined'
import {
  ExplorerPaneType,
  type PageContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'

export const allPagesMenuItem = ({
  appId,
  pageId,
}: Partial<PageContextParams>): NavigationBarItem => {
  const disabledPageListItem = {
    disabled: true,
    icon: <FileOutlined title="Pages" />,
    key: ExplorerPaneType.PageList,
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
      href: PageType.PageList({
        appId,
        pageId,
      }),
    },
  }
}
