import { PageType } from '@codelab/frontend/model/state/router'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  GetPagesList,
  UpdatePageModal,
} from '@codelab/frontend/modules/page'
import React, { useRouter } from 'next/router'
import { MainPaneTemplate } from '../../paneTemplates'

export const MainPanePage = () => {
  const router = useRouter()

  return (
    <MainPaneTemplate
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.AppList,
          }),
      }}
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
