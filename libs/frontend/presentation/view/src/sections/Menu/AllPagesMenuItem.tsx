import FileOutlined from '@ant-design/icons/FileOutlined'
import {
  ExplorerPaneType,
  type PageContextParams,
  PageType,
} from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

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
      href: PageType.PageBuilder(
        {
          appId,
          pageId,
        },
        {
          primarySidebarKey: ExplorerPaneType.PageList,
        },
      ),
    },
  }
}
