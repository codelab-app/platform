'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { DeleteRedirectModal } from '@codelab/frontend-application-redirect/use-cases/delete-redirect'
import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { usePageService } from '../services'
import { PageList } from '../use-cases/get-pages'

export const PagesPrimarySidebar = observer<PageContextParams>(
  ({ appId, pageId }) => {
    const app = useCurrentApp()
    const router = useRouter()
    const { createPopover } = usePageService()

    return (
      <CuiSidebar
        defaultActiveViewKeys={['pages']}
        label="Pages"
        popover={
          <>
            <CreateRedirectPopover />
            <UpdateRedirectPopover />
            <DeleteRedirectModal />
          </>
        }
        uiKey={UiKey.PageSidebar}
        views={[
          {
            content: app && <PageList app={app} />,
            key: 'pages',
            label: 'Pages',
            toolbar: {
              items: [
                {
                  cuiKey: UiKey.PageToolbarItemCreate,
                  icon: <PlusOutlined />,
                  onClick: () => createPopover.open(router, { appId, pageId }),
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
