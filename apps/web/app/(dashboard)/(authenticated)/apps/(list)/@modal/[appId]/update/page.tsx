import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'
import { UpdateAppModalContainer } from '@codelab/frontend-application-app/use-cases/update-app'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async ({ params }: PageProps<'appId'>) => {
  const { appId } = await params
  const { appsDto, atomsDto, domainsDto } = await appItemQuery({ appId })

  return (
    <DomainStoreHydrator
      appsDto={appsDto}
      atomsDto={atomsDto}
      domainsDto={domainsDto}
    >
      <UpdateAppModalContainer id={appId} />
    </DomainStoreHydrator>
  )
}

export default Page
