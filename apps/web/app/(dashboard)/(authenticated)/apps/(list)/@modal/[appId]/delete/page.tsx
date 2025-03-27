import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'
import { DeleteAppModalContainer } from '@codelab/frontend-application-app/use-cases/delete-app'

export const metadata: Metadata = {
  title: 'Delete App | Codelab',
}

const Page = async ({ params }: PageProps<'appId'>) => {
  const { appId } = await params
  /**
   * Must await here and data is blocked, suspense will show loader
   */
  const { appsDto, atomsDto, domainsDto } = await appItemQuery({ appId })

  return (
    <DomainStoreHydrator
      appsDto={appsDto}
      atomsDto={atomsDto}
      domainsDto={domainsDto}
    >
      <DeleteAppModalContainer id={appId} />
    </DomainStoreHydrator>
  )
}

export default Page
