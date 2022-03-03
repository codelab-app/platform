import { PageType } from '@codelab/frontend/abstract/types'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { useRouter } from 'next/router'
import { PageStore } from '../store'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  GetPagesList,
  UpdatePageModal,
} from '../use-cases'

export interface PageMainPaneProps {
  pages: PageStore
}

export const PageMainPane = observer<PageMainPaneProps>(({ pages }) => {
  const router = useRouter()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <MainPaneTemplate
      header={<CreatePageButton key={0} pages={pages} />}
      headerProps={headerProps}
      title="Pages"
    >
      <GetPagesList pages={pages} />
      <CreatePageModal pages={pages} />
      <UpdatePageModal pages={pages} />
      <DeletePageModal pages={pages} />
    </MainPaneTemplate>
  )
})
