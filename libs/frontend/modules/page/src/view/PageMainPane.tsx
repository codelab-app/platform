import { PageType } from '@codelab/frontend/abstract/types'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { useRouter } from 'next/router'
import { WithPageService } from '../store'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  GetPagesList,
  UpdatePageModal,
} from '../use-cases'

export const PageMainPane = observer<WithPageService>(({ pageService }) => {
  const router = useRouter()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <MainPaneTemplate
      header={<CreatePageButton key={0} pageService={pageService} />}
      headerProps={headerProps}
      title="Pages"
    >
      <GetPagesList pageService={pageService} />
      <CreatePageModal pageService={pageService} />
      <UpdatePageModal pageService={pageService} />
      <DeletePageModal pageService={pageService} />
    </MainPaneTemplate>
  )
})
