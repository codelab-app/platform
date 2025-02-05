import { appProductionRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from './component'

const ProductionPage = async (props: {
  params: Promise<{ domainSlug: string; pageSlug: string }>
}) => {
  const params = await props.params
  const { domainSlug, pageSlug } = params
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'
  const dto = await appProductionRepository({ domainSlug, pageUrlPattern })

  return <ClientProductionPage dto={dto} />
}

export default ProductionPage
