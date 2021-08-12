import { PageType } from '@codelab/frontend/model/state/router'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React, { useRouter } from 'next/router'
import {
  CreatePageButton,
  CreatePageModal,
} from '../use-cases/page/create-page'
import { DeletePageModal } from '../use-cases/page/delete-page'
import { GetPagesList } from '../use-cases/page/get-pages'
import { UpdatePageModal } from '../use-cases/page/update-page'

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
