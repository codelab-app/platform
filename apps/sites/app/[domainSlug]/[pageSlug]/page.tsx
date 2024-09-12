import { appProductionRepository } from '@codelab/frontend-domain-app/repositories'
import { ClientProductionPage } from './component'

const ProductionPage = async ({
  params: { domainSlug, pageSlug },
}: {
  params: { domainSlug: string; pageSlug: string }
}) => {
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'
  const dto = await appProductionRepository({ domainSlug, pageUrlPattern })

  return <ClientProductionPage dto={dto} />
}

export default ProductionPage
