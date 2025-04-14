import type { Metadata } from 'next'

import { ExportAdminDataModal } from '@codelab/frontend-application-admin/use-cases/export-data'

export const metadata: Metadata = {
  title: 'Export Admin Data | Codelab',
}

const Page = async () => {
  return <ExportAdminDataModal />
}

export default Page
