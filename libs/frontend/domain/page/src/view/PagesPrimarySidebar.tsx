import { CuiSidebar } from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  CreatePageForm,
  DeletePageModal,
  PageList,
  UpdatePageForm,
} from '../use-cases'

export const PagesPrimarySidebar = observer(() => {
  const { pageService } = useStore()
  const { app } = useCurrentApp()

  return (
    <>
      <CuiSidebar
        defaultActiveViewKeys={['pages']}
        label="Pages"
        views={[
          {
            content: (
              <>
                {!pageService.createForm.isOpen &&
                  !pageService.updateForm.isOpen &&
                  app && <PageList app={app} />}
                {pageService.createForm.isOpen && <CreatePageForm />}
                {pageService.updateForm.isOpen && <UpdatePageForm />}
              </>
            ),
            key: 'pages',
            label: 'Pages',
          },
        ]}
      />
      <DeletePageModal />
    </>
  )
})
