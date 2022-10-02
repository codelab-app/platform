import { IPageService } from '@codelab/frontend/abstract/core'
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

export const ExplorerPanePage = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
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
        <GetPagesList pageService={pageService} />
        <CreatePageModal pageService={pageService} />
        <UpdatePageModal pageService={pageService} />
        <DeletePageModal pageService={pageService} />
      </ExplorerPaneTemplate>
    )
  },
)
