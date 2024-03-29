import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import {
  CreateRedirectPopover,
  DeleteRedirectModal,
  UpdateRedirectPopover,
} from '@codelab/frontend/application/redirect'
import { useStore } from '@codelab/frontend/application/shared/store'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  CreatePagePopover,
  DeletePageModal,
  PageList,
  UpdatePagePopover,
} from '../use-cases'

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
