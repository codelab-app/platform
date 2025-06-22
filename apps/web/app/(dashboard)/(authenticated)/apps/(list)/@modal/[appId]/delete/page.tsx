import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import { appItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'
import { DeleteAppModalContainer } from '@codelab/frontend-application-app/use-cases/delete-app'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Delete App | Codelab',
}

/**
 * Typescript handles generics inference different when using aliases, particularity with conditional and union types when using type aliases with conditional types in TypeScript, inference can break down.
 *
 * Solution: Use the type directly in the function signature instead of through an alias.
 *
 * https://github.com/microsoft/TypeScript/issues/30020
 */

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

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
