'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { DeleteRedirectModal } from '@codelab/frontend-application-redirect/use-cases/delete-redirect'
import { UpdateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreatePagePopover } from '../use-cases/create-page'
import { DeletePageModal } from '../use-cases/delete-page'
import { PageList } from '../use-cases/get-pages'
import { UpdatePagePopover } from '../use-cases/update-page'

export const PagesPrimarySidebar = observer(() => {
  const { pageService } = useStore()
  const app = useCurrentApp()
  const { popover } = useCui()
  const page = pageService.deleteModal.page

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
        uiKey={MODEL_UI.SidebarPage.key}
        views={[
          {
            content: <>{app && <PageList app={app} />}</>,
            key: 'pages',
            label: 'Pages',
            toolbar: {
              items: [
                {
                  cuiKey: MODEL_ACTION.CreatePage.key,
                  icon: <PlusOutlined />,
                  onClick: () => {
                    pageService.createForm.open()
                    popover.open(MODEL_ACTION.CreatePage.key)
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
