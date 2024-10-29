'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { DeleteRedirectModal } from '@codelab/frontend-application-redirect/use-cases/delete-redirect'
import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'

import { DeletePageModal } from '../use-cases/delete-page'
import { useDeletePageModal } from '../use-cases/delete-page/delete-page.state'
import { PageList } from '../use-cases/get-pages'
import { UpdatePagePopover } from '../use-cases/update-page'

export const PagesPrimarySidebar = observer<PageContextParams>(
  ({ appId, pageId }) => {
    const app = useCurrentApp()
    const router = useRouter()
    const deletePageModal = useDeletePageModal()
    const page = deletePageModal.data?.current

    return (
      <>
        <CuiSidebar
          defaultActiveViewKeys={['pages']}
          label="Pages"
          popover={
            <>
              <UpdatePagePopover />
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
                    onClick: () => {
                      router.push(PageType.PageCreate({ appId, pageId }))
                    },
                    title: 'Create Page',
                  },
                ],
                title: 'Pages Toolbar',
              },
            },
          ]}
        />
        {page && <DeletePageModal page={page} />}
      </>
    )
  },
)
