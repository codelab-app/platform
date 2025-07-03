import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { appItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'
import { UpdateAppModalContainer } from '@codelab/frontend-application-app/use-cases/update-app'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

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
