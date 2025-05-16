import type { Metadata } from 'next'

import { ImportAdminDataModal } from '@codelab/frontend-application-admin/use-cases/import-data'

export const metadata: Metadata = {
  title: 'Import Admin Data | Codelab',
}

const Page = () => {
  return <ImportAdminDataModal />
}

export default Page
