'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { usePageService } from '../../services'
import { PageList } from '../../use-cases/get-pages'

export const PageListPrimarySidebar = observer(
  ({ app, pageId }: { app: IAppModel; pageId: string }) => {
    const router = useRouter()
    const { createPopover } = usePageService()

    return (
      <CuiSidebar
        defaultActiveViewKeys={['pages']}
        label="Pages"
        uiKey={UiKey.PageSidebar}
        views={[
          {
            content: <PageList app={app} />,
            key: 'pages',
            label: 'Pages',
            toolbar: {
              items: [
                {
                  cuiKey: UiKey.PageToolbarItemCreate,
                  icon: <PlusOutlined />,
                  onClick: () =>
                    createPopover.open(router, {
                      appId: app.id,
                      pageId,
                    }),
                  title: 'Create Page',
                },
              ],
              title: 'Pages Toolbar',
            },
          },
        ]}
      />
    )
  },
)
