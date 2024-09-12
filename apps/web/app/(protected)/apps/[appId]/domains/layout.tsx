import { DomainsPageHeader } from '@codelab/frontend-application-domain/views'
import { Dashboard } from '@codelab/frontend-presentation-view/templates'

const DomainsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard Header={<DomainsPageHeader />}>{children}</Dashboard>
}

export default DomainsPageLayout
