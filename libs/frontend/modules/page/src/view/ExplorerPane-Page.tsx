import { PAGE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React, { useRouter } from 'next/router'
import { CreatePageButton, GetPagesList } from '../use-cases'

export const ExplorerPanePage = observer<WithServices<PAGE_SERVICE>>(
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
      </ExplorerPaneTemplate>
    )
  },
)
