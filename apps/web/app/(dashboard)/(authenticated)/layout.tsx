import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { preferenceQuery } from '@codelab/frontend-domain-preference/repositories'

import { RootProviders } from '../../../providers/RootProviders'

const Layout = async ({ children }: LayoutProps) => {
  const user = await getServerUser()

  const preferences = await preferenceQuery(
    { owner: { id: user.id } },
    {},
    {
      attributes: {
        'service.component': 'dashboard-authenticated-layout',
      },
    },
  )

  return (
    <RootProviders user={{ ...user, preferences }}>{children}</RootProviders>
  )
}

Layout.displayName = 'AuthenticatedLayout'

export default Layout
