import { appProductionRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from './component'

const ProductionPage = async ({
  params,
}: {
  params: Promise<{ domainSlug: string; pageSlug: string }>
}) => {
  const { domainSlug, pageSlug } = await params
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'
  const dto = await appProductionRepository({ domainSlug, pageUrlPattern })

  return <ClientProductionPage dto={dto} />
}

export default ProductionPage
