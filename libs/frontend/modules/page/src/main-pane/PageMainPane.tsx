import { PageType } from '@codelab/frontend/model/store/router'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React, { useRouter } from 'next/router'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  GetPagesList,
  UpdatePageModal,
} from '../use-cases'

export const PageMainPane = () => {
  const router = useRouter()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <MainPaneTemplate
      header={<CreatePageButton key={0} />}
      headerProps={headerProps}
      title="Pages"
    >
      <GetPagesList />
      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </MainPaneTemplate>
  )
}
