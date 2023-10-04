import { PlusOutlined } from '@ant-design/icons'
import { FormNames } from '@codelab/frontend/abstract/types'
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

  return (
    <>
      <CuiSidebar
        defaultActiveViewKeys={['pages']}
        label="Pages"
        popover={
          <>
            <CreatePagePopover />
            <UpdatePagePopover />
          </>
        }
        views={[
          {
            content: <>{app && <PageList app={app} />}</>,
            key: 'pages',
            label: 'Pages',
            toolbar: {
              items: [
                {
                  icon: <PlusOutlined />,
                  key: 'create-page',
                  onClick: () => {
                    pageService.createForm.open()
                    popover.open(FormNames.CreatePage)
                  },
                  title: 'Create Page',
                },
              ],
              title: 'Pages Toolbar',
            },
          },
        ]}
      />
      <DeletePageModal />
    </>
  )
})