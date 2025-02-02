'use client'

import type { IAppProductionDto } from '@codelab/frontend/abstract/domain'

import { useAppProduction } from '@codelab/frontend-application-app/use-cases/app-production'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const ClientProductionPage = observer(
  ({ dto }: { dto: IAppProductionDto }) => {
    useAppProduction(dto)

    const { rendererService } = useApplicationStore()
    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return null
    }

    return (
      <>
        {/* <Head>
        <title>{result?.page.name ?? 'Loading...'}</title>
      </Head> */}

        <RootRenderer renderer={renderer} />
      </>
    )
  },
)
