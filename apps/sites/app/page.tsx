import { appServerActions } from '@codelab/shared-domain-module-app'
import { getM2MToken } from '@codelab/shared-infra-auth0/server'

import { PageLayout } from '../components'

const { AppListPreview } = appServerActions

// Force dynamic rendering to avoid build-time data fetching
export const dynamic = 'force-dynamic'

const Page = async () => {
  // Get M2M token for authentication
  const token = await getM2MToken()

  // Fetch all apps using M2M authentication
  // No filters, fetch all apps
  const { items: apps } = await AppListPreview(
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  // Calculate total pages across all apps
  const totalPages = apps.reduce((sum, app) => sum + app.pages.length, 0)

  return <PageLayout apps={apps} totalPages={totalPages} />
}

export default Page
