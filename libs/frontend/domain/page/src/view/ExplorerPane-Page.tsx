import type {
  IDomainService,
  IPageService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { useRouter } from 'next/router'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  GetPagesList,
  UpdatePageModal,
} from '../use-cases'

export const ExplorerPanePage = observer<{
  pageService: IPageService
  domainService: IDomainService
  userService: IUserService
}>(({ pageService, domainService, userService }) => {
  const router = useRouter()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <ExplorerPaneTemplate
      header={<CreatePageButton key={0} pageService={pageService} />}
      headerProps={headerProps}
      title="Pages"
    >
      <GetPagesList domainService={domainService} pageService={pageService} />
      <CreatePageModal pageService={pageService} userService={userService} />
      <UpdatePageModal pageService={pageService} />
      <DeletePageModal pageService={pageService} />
    </ExplorerPaneTemplate>
  )
})
