import { PageType } from '@codelab/frontend/model/state/router'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React, { useRouter } from 'next/router'
import { CreatePageButton, CreatePageModal } from '../use-cases/create-page'
import { DeletePageModal } from '../use-cases/delete-page'
import { GetPagesList } from '../use-cases/get-pages'
import { UpdatePageModal } from '../use-cases/update-page'

export const PageMainPane = () => {
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
