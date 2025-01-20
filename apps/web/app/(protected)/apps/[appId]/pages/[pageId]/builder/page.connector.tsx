'use client'

import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const PageBuilderConnector = observer(
  ({ pageId }: { pageId: string }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)

    return (
      <PageBuilder
        // Decouple renderer from builder
        RootRenderer={RootRenderer}
        page={page}
      />
    )
  },
)

PageBuilderConnector.displayName = 'PageBuilderContainer'
