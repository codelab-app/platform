'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { usePageService } from '@codelab/frontend-application-page/services'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const PageBuilderContainer = observer(
  ({ pageId }: { pageId: string }) => {
    const page = usePageService().getOneFromCache({ id: pageId })

    return (
      <PageBuilder
        // Decouple renderer from builder
        RootRenderer={RootRenderer}
        page={page}
        rendererType={RendererType.PageBuilder}
      />
    )
  },
)
