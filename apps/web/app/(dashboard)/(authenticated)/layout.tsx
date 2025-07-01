import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { preferenceQuery } from '@codelab/frontend-domain-preference/repositories'

import { RootProviders } from '../../../providers/RootProviders'

const Layout = async ({ children }: LayoutProps) => {
  const serverUser = await getServerUser()

  const preferences = await preferenceQuery(
    { owner: { id: serverUser.id } },
    {},
    {
      attributes: {
        'service.component': 'dashboard-authenticated-layout',
      },
    },
  )

  const user = { ...serverUser, preferences }

  return <RootProviders user={user}>{children}</RootProviders>
}

Layout.displayName = 'AuthenticatedLayout'

export default Layout
