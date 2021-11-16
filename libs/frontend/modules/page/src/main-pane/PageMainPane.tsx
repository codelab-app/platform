import { PageType } from '@codelab/frontend/model/state/router'
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
      headerProps={headerProps}
      title="Pages"
      header={<CreatePageButton key={0} />}
    >
      <GetPagesList />
      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </MainPaneTemplate>
  )
}
