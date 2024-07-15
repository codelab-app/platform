import type { IAppProductionDto } from '@codelab/frontend/abstract/domain'
import { useAppProduction } from '@codelab/frontend-application-app/use-cases/app-production'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import React from 'react'

export const ClientProductionPage = ({ dto }: { dto: IAppProductionDto }) => {
  const { renderer } = useAppProduction(dto)

  return (
    <>
      {/* <Head>
        <title>{result?.page.name ?? 'Loading...'}</title>
      </Head> */}

      <RootRenderer renderer={renderer} />
    </>
  )
}
