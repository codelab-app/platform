'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { DeleteRedirectModal } from '@codelab/frontend-application-redirect/use-cases/delete-redirect'
import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { observer } from 'mobx-react-lite'
import { CreatePagePopover } from '../use-cases/create-page'
import { useCreatePageForm } from '../use-cases/create-page/create-page.state'
import { DeletePageModal } from '../use-cases/delete-page'
import { useDeletePageModal } from '../use-cases/delete-page/delete-page.state'
import { PageList } from '../use-cases/get-pages'
import { UpdatePagePopover } from '../use-cases/update-page'

export const PagesPrimarySidebar = observer(() => {
  const app = useCurrentApp()
  const { popover } = useCui()
  const createPageForm = useCreatePageForm()
  const deletePageModal = useDeletePageModal()
  const page = deletePageModal.data?.current

  return (
    <>
      <CuiSidebar
        defaultActiveViewKeys={['pages']}
        label="Pages"
        popover={
          <>
            <CreatePagePopover />
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
                  cuiKey: UiKey.CreatePageToolbarItem,
                  icon: <PlusOutlined />,
                  onClick: () => {
                    createPageForm.open()
                    popover.open(UiKey.CreatePagePopover)
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
})
